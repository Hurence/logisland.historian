package com.hurence.logisland.historian.generator

import java.io.{BufferedOutputStream, File, FileOutputStream}
import java.nio.file.Files
import java.util.{Collections, Random}
import java.util.stream.Collectors

import be.cetic.rtsgen.Utils
import be.cetic.rtsgen.config.{Configuration, Series}
import com.github.nscala_time.time.Imports._
import spray.json._

import scala.collection.JavaConverters._

class TSimulusWrapper {

    def generate(content: String): java.util.List[String] = {

        val dtf = DateTimeFormat.forPattern("dd.MM.yyyy HH:mm:ss.SSS")

        val config = Configuration(content.parseJson)

        if (config.generators.nonEmpty) {

            println("starting data generation")

            val duration = new Duration(config.from.toDateTime(DateTimeZone.UTC), config.to.toDateTime(DateTimeZone.UTC))

            val nbPoints = duration.getMillis / config.series(0).frequency.getMillis

            println(s"will generate $nbPoints")

            val ts = Utils.generate(Utils.config2Results(config))



            def writeBytes( data : Stream[Byte], file : File ) = {
                val target = new BufferedOutputStream( new FileOutputStream(file) );
                try data.foreach( target.write(_) ) finally target.close;
            }

/*

            val serieName = config.series(0).name
            val serieContent = ts.flatMap(p => s"${dtf.print(p._1)};${p._3}\n".getBytes)
          //  val seriesTxt = s"date;$serieName\n".getBytes ++ serieContent
            val temp = File.createTempFile(serieName, ".csv")
            println(s"writing to ${temp.getAbsolutePath}")
            writeBytes(serieContent,temp)
           // Files.write(temp.toPath, seriesTxt)
            Collections.singletonList(temp.getAbsolutePath)

*/
            /**/
                        ts.groupBy(k => k._2)
                            .map(p => {
                                val serieName = p._1
                                val serieContent = p._2.map(p => s"${dtf.print(p._1)};${p._3}").mkString("\n")
                                val seriesTxt = s"date;$serieName\n".getBytes ++ serieContent.getBytes
                                val temp = File.createTempFile(serieName, ".csv")
                                Files.write(temp.toPath, seriesTxt)
                                temp.getAbsolutePath
                            }).toList.asJava
        } else
            List.empty.asJava
    }

    /** Generate csv file to import using tagIds for measures ids instead of those in json schema.
      *
      * @param content
      * @param tagIds
      * @return
      */
    def generate(content: String, tagIds: List[String]): java.util.List[String] = {

        val dtf = DateTimeFormat.forPattern("dd.MM.yyyy HH:mm:ss.SSS")

        val config = Configuration(buildConfigForTags(content.parseJson, tagIds))

        if (config.generators.nonEmpty) {

            println("starting data generation")

            val duration = new Duration(config.from.toDateTime(DateTimeZone.UTC), config.to.toDateTime(DateTimeZone.UTC))

            val nbPoints = duration.getMillis / config.series(0).frequency.getMillis

            println(s"will generate $nbPoints")

            val ts = Utils.generate(Utils.config2Results(config))


            def writeBytes(data: Stream[Byte], file: File) = {
                val target = new BufferedOutputStream(new FileOutputStream(file));
                try data.foreach(target.write(_)) finally target.close;
            }

            ts.groupBy(k => k._2)
                .map(p => {
                    val serieName = p._1
                    val serieContent = p._2.map(p => s"${dtf.print(p._1)};${p._3}").mkString("\n")
                    val seriesTxt = s"date;$serieName\n".getBytes ++ serieContent.getBytes
                    val temp = File.createTempFile(serieName, ".csv")
                    Files.write(temp.toPath, seriesTxt)
                    temp.getAbsolutePath
                }).toList.asJava
        } else
            List.empty.asJava
    }

    private def buildConfigForTags(root: JsValue, tagIds: List[String]): JsValue = {
        val fields = root.asJsObject.fields
        val generatorNames: List[String] = fields("generators") match
        {
            case JsArray(l) => l.map(_.asJsObject.fields("name").asInstanceOf[JsString].value).toList
            case _ => throw new ClassCastException
        }
        val random = new Random()

        val seriesJson: List[JsObject] = tagIds.map(id => {
            val generatorName = generatorNames(random.nextInt(generatorNames.size))
            val frequency = (random.nextInt(5) + 1) * 20000
            JsObject("name" -> JsString(id),
                "generator" -> JsString(generatorName),
                "frequency" -> JsNumber(frequency))
        })
        val configWithGeneratedExport: JsValue = JsObject(fields + ("exported" -> JsArray(seriesJson : _*)))
        configWithGeneratedExport
    }
}