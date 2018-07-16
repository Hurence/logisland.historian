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

import com.hurence.logisland.historian.repository.SolrDataflowRepository;
import com.hurence.logisland.historian.rest.v1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.threeten.bp.OffsetDateTime;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DataflowsApiService {


    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private static final String opcDataflowName = "OpcTagsInjector";

    @Resource
    private SolrDataflowRepository repository;

    private DatasourcesApiService datasourcesApiService;
    private TagsApiService tagsApiService;

    @Autowired
    public void setDatasourcesApiService(DatasourcesApiService datasourcesApiService) {
        this.datasourcesApiService = datasourcesApiService;
    }

    @Autowired
    public void setTagsApiService(TagsApiService tagsApiService) {
        this.tagsApiService = tagsApiService;
    }

    public Optional<DataFlow> getDataflow(String dataflowName) {
        logger.debug("getting DataFlow {}", dataflowName);
        return repository.findById(dataflowName);
    }

    public Optional<DataFlowWithId> updateOpcDataflow() {
        List<Datasource> datasources = datasourcesApiService.getAllDatasources("*");
        if (datasources.isEmpty()) {
            DataFlowWithId df = this.buildOpcDataflow(datasources);
            repository.save(df);
            return Optional.of(df);
        } else {
            return Optional.empty();
        }
    }

    private DataFlowWithId buildOpcDataflow(List<Datasource> datasources) {
        DataFlowWithId df = new DataFlowWithId();
        df.setId(opcDataflowName);
        df.setLastModified(OffsetDateTime.now());
        df.setModificationReason("Modified tags to retrieve");

        // Services
        List<com.hurence.logisland.historian.rest.v1.model.Service> services = new ArrayList<>();
        com.hurence.logisland.historian.rest.v1.model.Service console =
                DataFlowUtil.buildConsoleService(opcDataflowName);
        services.add(console);
        com.hurence.logisland.historian.rest.v1.model.Service chronix =
                DataFlowUtil.buildChronixService(opcDataflowName);
        services.add(chronix);

        // Streams
        List<Stream> streams = new ArrayList<>();
        for (Datasource ds: datasources) {
            DatasourceFlowElements dsElem = new DatasourceFlowElements(
                    ds, chronix.getName(), opcDataflowName, console.getName(), tagsApiService
            );
            if (dsElem.isActive()) {
                services.add(dsElem.getService());
                streams.add(dsElem.getStream());
            }
        }
        df.setServices(services);
        df.setStreams(streams);
        return df;
    }

}