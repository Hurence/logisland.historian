package com.hurence.logisland.historian.generator

import java.io.File
import java.nio.file.{Files, Paths}

import be.cetic.rtsgen.Utils
import be.cetic.rtsgen.config.Configuration
import com.github.nscala_time.time.Imports._
import spray.json._

import scala.collection.JavaConverters._

class TSimulusWrapper {

    def generate(content: String): java.util.List[String] = {

        val dtf = DateTimeFormat.forPattern("dd.MM.yyyy HH:mm:ss.SSS")

        val config = Configuration(content.parseJson)


        if (config.generators.nonEmpty) {
            val names = config.series.map(g => g.name)

            println("starting data generation")

            Utils.generate(Utils.config2Results(config))
                .groupBy(k => k._2)
                .map(p => {
                    val serieName = p._1
                    val serieContent = p._2.map(p => s"${dtf.print(p._1)};${p._3}").mkString("\n")
                    val seriesTxt = s"date;$serieName\n".getBytes ++ serieContent.getBytes
                    val temp = File.createTempFile(serieName, ".csv")
                    Files.write(temp.toPath, seriesTxt)
                    temp.getAbsolutePath
                }).toList.asJava
        }else
            List.empty.asJava
    }
}