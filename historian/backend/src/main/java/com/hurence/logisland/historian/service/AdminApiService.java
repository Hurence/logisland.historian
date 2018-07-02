/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.hurence.logisland.historian.service;

import com.hurence.logisland.chronix.importer.csv.Attributes;
import com.hurence.logisland.chronix.importer.csv.ChronixImporter;
import com.hurence.logisland.chronix.importer.csv.FileImporter;
import com.hurence.logisland.chronix.importer.csv.Pair;
import com.hurence.logisland.historian.generator.TSimulusWrapper;
import com.hurence.logisland.historian.repository.SolrDatasourceRepository;
import com.hurence.logisland.historian.repository.SolrTagRepository;
import com.hurence.logisland.historian.rest.v1.model.BulkLoad;
import com.hurence.logisland.historian.rest.v1.model.Datasource;
import com.hurence.logisland.historian.rest.v1.model.IdUtils;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.util.*;
import java.util.function.Consumer;

import scala.collection.JavaConverters;
import scala.collection.JavaConverters.*;

@Service
public class AdminApiService {


    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private static final String TAGS_LIST = "tags";

    @Resource
    private SolrTagRepository solrTagRepository;

    @Resource
    private SolrDatasourceRepository solrDatasourceRepository;


    @Value("${spring.data.solr.host}")
    private String solrHost;

    private SolrClient solrClient;

    @PostConstruct
    public void init() {
        solrClient = new HttpSolrClient.Builder().withBaseSolrUrl(solrHost + "/chronix").build();
    }


    // inject the template as ListOperations
   // private ListOperations<String, Object> listOps;


    private List<String> domains = Arrays.asList("hurence");
    private List<String> servers = Arrays.asList("usine 1", "usine 2", "usine 3");
    private List<String> groups = Arrays.asList(
            "Temperature", "Pression", "Force", "Rayonnement optique",
            "Accélération", "Vitesse", "Position", "Courant");


    public void deleteAllTag() {
        solrTagRepository.deleteAll();
    }

    public List<String> getAllTagIds() {
        List<String> names = new ArrayList<>();
        solrTagRepository.findByText("*:*").forEach(
              tag -> names.add(tag.getId())
        );
        return names;
    }

    public List<Tag> generateSampleTags(boolean doFlush) {

        List<Tag> tags = new ArrayList<>();

        Random random = new Random();
        int tagsCount = random.nextInt(30);

        while (tagsCount > 0) {

            String domain = domains.get(random.nextInt(domains.size()));
            String server = servers.get(random.nextInt(servers.size()));
            String group = groups.get(random.nextInt(groups.size()));
            String tagName = group.toLowerCase().replaceAll("[^\\x00-\\x7F]", "") + '-' + UUID.randomUUID().toString().substring(0, 5);
            Tag t = IdUtils.setId(new Tag()
                    .domain(domain)
                    .server(server)
                    .group(group)
                    .tagName(tagName));

            tags.add(t);
            solrTagRepository.save(t);

           // listOps.leftPush(TAGS_LIST, t);
            tagsCount--;
        }


        //   Tag tag = solrTemplate.getById("/hurence/opc-server1/sensors.temperature/TEMP008", Tag.class);


        //   List<Tag> tags = solrTagRepository.findByDomain("hurence");//, new PageRequest(1, 20) );

        //   logger.info(tag.toString());

        /*


        List<Tag> tags = listOps.range(TAGS_LIST, 0, tagsCount - 1)
                .stream()
                .map(Tag.class::cast)
                .collect(Collectors.toList());*/

        return tags;//.getContent();
    }

    public List<Datasource> generateSampleDatasources(boolean doFlush) {

        List<Datasource> ds = new ArrayList<>();

        Random random = new Random();
        int count = random.nextInt(20);

        while (count > 0) {

            String domain = domains.get(random.nextInt(domains.size()));
            String server = servers.get(random.nextInt(servers.size()));
            String group = groups.get(random.nextInt(groups.size()));
            String tag = UUID.randomUUID().toString().substring(0, 5);
            Datasource t = IdUtils.setId(new Datasource()
                    .domain(domain)
                    .clsid(UUID.randomUUID().toString())
                    .host(server)
                    .user("tom")
                    .password("xxx"));

            ds.add(t);
            solrDatasourceRepository.save(t);


            count--;
        }


        return ds;
    }


    public BulkLoad launchTagMeasuresGenerator(MultipartFile config, List<String> metricNames, Boolean clean) {

        BulkLoad bl = new BulkLoad();
        try {
            String contentStr = new String(config.getBytes());
            TSimulusWrapper simulator = new TSimulusWrapper();

            long startGeneration = System.currentTimeMillis();

            List<String> generatedFiles = simulator.generate(contentStr,
                    JavaConverters.asScalaBufferConverter(metricNames).asScala().toList());

            bl.setGenerationDuration((int) (System.currentTimeMillis() - startGeneration));
            generatedFiles.forEach(file -> {
                String[] attributes = new String[]{"source"};

                Map<Attributes, Pair<Instant, Instant>> importStatistics = new HashMap<>();
                ChronixImporter chronixImporter = new ChronixImporter((HttpSolrClient) solrClient, attributes);
                FileImporter importer = new FileImporter("dd.MM.yyyy HH:mm:ss.SSS", "ENGLISH", ";");
                Pair<Integer, Integer> result;

                logger.info("Start importing files to the Chronix.");
                long start = System.currentTimeMillis();

                String[] fileNameMetaData = config.getOriginalFilename().split("_");


                InputStream is;

                try {
                    logger.info("Start importing " + file);
                    is = new FileInputStream(file);

                    result = importer.importPoints(importStatistics, is, fileNameMetaData, chronixImporter.importToChronix(clean, false, 10000));

                    logger.info("Done importing. Trigger commit.");
                    chronixImporter.commit();
                    long end = System.currentTimeMillis();


                    logger.info("Import done (Took: {} sec). Imported {} time series with {} points", (end - start) / 1000, result.getFirst(), result.getSecond());


                    bl.importDuration((int) (end - start))
                            .numMetricsImported(result.getFirst())
                            .numPointsImported(Long.valueOf(result.getSecond()));


                    //((HashMap) importStatistics).entrySet().toArray()[0].key.metric

                    ((HashMap) importStatistics).entrySet().forEach(k -> {
                        bl.addMetricsItem(k.toString());

                    });
                    is.close();
                } catch (FileNotFoundException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }


            });


        } catch (IOException e) {
            e.printStackTrace();
        }

        return bl;
    }

}