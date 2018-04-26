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

import com.hurence.logisland.historian.rest.v1.model.Mesures;
import de.qaware.chronix.ChronixClient;
import de.qaware.chronix.converter.MetricTimeSeriesConverter;
import de.qaware.chronix.solr.client.ChronixSolrStorage;
import de.qaware.chronix.timeseries.MetricTimeSeries;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.*;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class MesuresApiService {


    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @Resource(name = "solrClientChronix")
    private SolrClient solrClient;


    static Function<MetricTimeSeries, String> groupBy = MetricTimeSeries::getName;
    static BinaryOperator<MetricTimeSeries> reduce = (binaryTimeSeries, binaryTimeSeries2) -> binaryTimeSeries;

    final ChronixSolrStorage<MetricTimeSeries> storage = new ChronixSolrStorage<>(3, groupBy, reduce);
    final ChronixClient<MetricTimeSeries, SolrClient, SolrQuery> chronix =
            new ChronixClient<>(new MetricTimeSeriesConverter(),
                    new ChronixSolrStorage<>(100, groupBy, reduce));


    private Mesures convertToMesures(MetricTimeSeries mts) {
        final Double[] values = ArrayUtils.toObject(mts.getValues().toArray());
        final Long[] timestamps = ArrayUtils.toObject(mts.getTimestamps().toArray());
        final Map<String, Object> attributes = mts.getAttributesReference();


        final Mesures chunk = new Mesures();

        chunk.setName(mts.getName());
        chunk.setStart(mts.getStart());
        chunk.setEnd(mts.getEnd());
        chunk.setQuality((Double) attributes.get("quality"));
        chunk.setValues(Arrays.asList(values));
        chunk.setTimestamps(Arrays.asList(timestamps));
        chunk.setNumPoints(values.length);

        attributes.forEach((k, v) -> {
            if (k.contains("function")) {
                String name = k.substring(k.lastIndexOf("_") + 1);
                if( v instanceof Boolean){
                    if((Boolean) v)
                        chunk.addFunctionsItem(new com.hurence.logisland.historian.rest.v1.model.Function().name(name).value(1.0));
                    else
                        chunk.addFunctionsItem(new com.hurence.logisland.historian.rest.v1.model.Function().name(name).value(0.0));
                }else if( v instanceof Double){
                    Double value = (Double) v;
                    chunk.addFunctionsItem(new com.hurence.logisland.historian.rest.v1.model.Function().name(name).value(value));
                }

            }
        });
        if (chunk.getFunctions() == null)
            chunk.functions(Collections.emptyList());

        return chunk;
    }


    public Optional<Mesures> getTagMesures(String itemId, String start, String end, String functions) {

        long startTime = System.currentTimeMillis();
        StringBuilder queryBuilder = new StringBuilder();


        if (itemId != null && !itemId.isEmpty())
            queryBuilder.append("name:").append(itemId).append(" ");

        if (start != null && !start.isEmpty())
            queryBuilder.append("AND start:").append(start).append(" ");

        if (end != null && !end.isEmpty())
            queryBuilder.append("AND end:").append(end).append(" ");


        queryBuilder.deleteCharAt(queryBuilder.length() - 1); // remove trailing space


        final SolrQuery query = new SolrQuery(queryBuilder.toString());

        if (functions != null && !functions.isEmpty()) {
            query.setParam("cf", "metric{" + functions + "}");
        }

        query.setFields("dataAsJson");
        logger.info(query.toString());

        //    Mesures mesures = new Mesures();
      List<Mesures> chunks = chronix.stream(solrClient, query)
                .map(this::convertToMesures)
                .collect(Collectors.toList());



        if (chunks.isEmpty())
            return Optional.empty();
        else
            return Optional.of(chunks.get(0).queryDuration(System.currentTimeMillis() - startTime));

    }
}