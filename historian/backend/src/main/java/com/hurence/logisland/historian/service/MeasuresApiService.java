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
import com.hurence.logisland.historian.rest.v1.model.BulkLoad;
import com.hurence.logisland.historian.rest.v1.model.Measures;
import de.qaware.chronix.ChronixClient;
import de.qaware.chronix.converter.MetricTimeSeriesConverter;
import de.qaware.chronix.solr.client.ChronixSolrStorage;
import de.qaware.chronix.timeseries.MetricTimeSeries;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.util.*;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.stream.Collectors;


@Service
public class MeasuresApiService {


    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @Resource(name = "solrClientChronix")
    private SolrClient solrClient;


    static Function<MetricTimeSeries, String> groupBy = MetricTimeSeries::getName;
    static BinaryOperator<MetricTimeSeries> reduce = (binaryTimeSeries, binaryTimeSeries2) -> binaryTimeSeries;

    final ChronixSolrStorage<MetricTimeSeries> storage = new ChronixSolrStorage<>(3, groupBy, reduce);
    final ChronixClient<MetricTimeSeries, SolrClient, SolrQuery> chronix =
            new ChronixClient<>(new MetricTimeSeriesConverter(),
                    new ChronixSolrStorage<>(100, groupBy, reduce));


    private Measures convertToMeasures(MetricTimeSeries mts, boolean noValues) {
        final Double[] values = ArrayUtils.toObject(mts.getValues().toArray());
        final Long[] timestamps = ArrayUtils.toObject(mts.getTimestamps().toArray());
        final Map<String, Object> attributes = mts.getAttributesReference();


        final Measures chunk = new Measures();

        chunk.setName(mts.getName());
        chunk.setStart(mts.getStart());
        chunk.setEnd(mts.getEnd());
        if (!noValues) {
            chunk.setQuality((Double) attributes.get("quality"));
            chunk.setValues(Arrays.asList(values));
            chunk.setTimestamps(Arrays.asList(timestamps));
            chunk.setNumPoints(values.length);
        }
        attributes.forEach((k, v) -> {
            if (k.contains("function")) {
                String name = k.substring(k.lastIndexOf("_") + 1);
                if (v instanceof Boolean) {
                    if ((Boolean) v)
                        chunk.addFunctionsItem(new com.hurence.logisland.historian.rest.v1.model.Function().name(name).value(1.0));
                    else
                        chunk.addFunctionsItem(new com.hurence.logisland.historian.rest.v1.model.Function().name(name).value(0.0));
                } else if (v instanceof Double) {
                    Double value = (Double) v;
                    chunk.addFunctionsItem(new com.hurence.logisland.historian.rest.v1.model.Function().name(name).value(value));
                }

            }
        });
        if (chunk.getFunctions() == null)
            chunk.functions(Collections.emptyList());

        return chunk;
    }


    /**
     * returns a list of measures for a given Tag
     *
     * @param itemId
     * @param start
     * @param end
     * @param functions
     * @return
     */
    public Optional<Measures> getTagMeasures(String itemId, String start, String end, String functions, Boolean noValues) {

        long startTime = System.currentTimeMillis();
        StringBuilder queryBuilder = new StringBuilder();


        if (itemId != null && !itemId.isEmpty())
            queryBuilder.append("name:\"").append(itemId).append("\" ");


        if (start != null && !start.isEmpty())
            queryBuilder.append("AND start:").append(start).append(" ");

        if (end != null && !end.isEmpty())
            queryBuilder.append("AND end:").append(end).append(" ");


        queryBuilder.deleteCharAt(queryBuilder.length() - 1); // remove trailing space


        final SolrQuery query = new SolrQuery(queryBuilder.toString());

        if (functions != null && !functions.isEmpty()) {
            query.setParam("cf", "metric{" + functions + "}");
        }

        if (!noValues) {
            query.setFields("dataAsJson");
        }
        logger.info(query.toString());

        List<Measures> chunks = chronix.stream(solrClient, query)
                .map((MetricTimeSeries mts) -> convertToMeasures(mts, noValues))
                .collect(Collectors.toList());


        if (chunks.isEmpty())
            return Optional.empty();
        else
            return Optional.of(chunks.get(0).queryDuration(System.currentTimeMillis() - startTime));

    }


    /**
     * upload and parses a CSV file
     *
     * @param content
     * @param csvDelimiter
     * @param dateFormat
     * @param numberFormat
     * @param attributeFields
     * @param cleanImport
     * @return
     */
    public BulkLoad uploadTagMeasures(MultipartFile content, String csvDelimiter, String dateFormat, String numberFormat, String attributeFields, Boolean cleanImport, Integer pointsByChunk) {

        BulkLoad bl = new BulkLoad();
        try {
            String contentStr = new String(content.getBytes());

            String[] attributes = (attributeFields != null) ? attributeFields.split(",") : new String[]{"source"};

            Map<Attributes, Pair<Instant, Instant>> importStatistics = new HashMap<>();
            ChronixImporter chronixImporter = new ChronixImporter((HttpSolrClient) solrClient, attributes);
            FileImporter importer = new FileImporter(dateFormat, numberFormat, csvDelimiter);
            Pair<Integer, Integer> result;

            logger.info("Start importing files to the Chronix.");
            long start = System.currentTimeMillis();

            String[] fileNameMetaData = content.getOriginalFilename().split("_");

            result = importer.importPoints(importStatistics,
                    content.getInputStream(),
                    fileNameMetaData,
                    chronixImporter.importToChronix(cleanImport, false, pointsByChunk));

            logger.info("Done importing. Trigger commit.");
            chronixImporter.commit();
            long end = System.currentTimeMillis();


            logger.info("Import done (Took: {} sec). Imported {} time series with {} points", (end - start) / 1000, result.getFirst(), result.getSecond());


            bl.importDuration((int) (end - start))
                    .numMetricsImported(result.getFirst())
                    .numPointsImported(Long.valueOf(result.getSecond()));

            ((HashMap) importStatistics).entrySet().forEach(k -> {
                bl.addMetricsItem(k.toString());

            });


        } catch (IOException e) {
            e.printStackTrace();
        }

        return bl;
    }


    public BulkLoad launchTagMeasuresGenerator(MultipartFile config, String attributeFields, Boolean cleanImport) {

        BulkLoad bl = new BulkLoad();
        try {
            String contentStr = new String(config.getBytes());

            TSimulusWrapper simulator = new TSimulusWrapper();


            long startGeneration = System.currentTimeMillis();

            List<String> generatedFiles = simulator.generate(contentStr);
            bl.setGenerationDuration((int) (System.currentTimeMillis()- startGeneration));
            generatedFiles.forEach(file -> {
                String[] attributes = (attributeFields != null) ? attributeFields.split(",") : new String[]{"source"};

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

                    result = importer.importPoints(importStatistics, is, fileNameMetaData, chronixImporter.importToChronix(cleanImport, false, 10000));

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