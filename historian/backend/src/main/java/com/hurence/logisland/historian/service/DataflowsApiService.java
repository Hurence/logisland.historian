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

import com.hurence.logisland.historian.config.bean.LogislandConfigurationBean;
import com.hurence.logisland.historian.repository.SolrDataflowRepository;
import com.hurence.logisland.historian.rest.v1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.threeten.bp.OffsetDateTime;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DataflowsApiService {


    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private LogislandConfigurationBean logislandConfigurationBean;

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
        return repository.findById(dataflowName).map(DataFlowUtil::convertDfstoDf);
    }

    public Optional<DataFlow> updateOpcDataflow() {
        logger.info("generating new DataFlow '{}'", logislandConfigurationBean.getOpcDataflowName());
        List<Datasource> datasources = datasourcesApiService.getAllDatasources("*");
        if (!datasources.isEmpty()) {
            DataFlow df = this.buildOpcDataflow(datasources);
            DataFlowSimple dfs = DataFlowUtil.convertDftoDfs(df);
            repository.save(dfs);
            return Optional.of(df);
        } else {
            return Optional.empty();
        }
    }

    public void updateLastPing(String dataflowId, Date date) {
        logger.info("Updating last ping timestamp for dataflow {}", dataflowId);
        repository.updatePingTimestamp(dataflowId, date);

    }

    private DataFlow buildOpcDataflow(List<Datasource> datasources) {
        DataFlow df = new DataFlow();
        final String opcDataflowName = logislandConfigurationBean.getOpcDataflowName();
        df.setId(opcDataflowName);
        df.setLastModified(DateUtil.toUtcDateForSolr(OffsetDateTime.now()));
        df.setModificationReason("Modified tags to retrieve");

        // Services
        List<com.hurence.logisland.historian.rest.v1.model.Service> services = new ArrayList<>();
        com.hurence.logisland.historian.rest.v1.model.Service sink =
                DataFlowUtil.buildSinkService(opcDataflowName);
        services.add(sink);
        com.hurence.logisland.historian.rest.v1.model.Service chronix =
                DataFlowUtil.buildChronixService(opcDataflowName, logislandConfigurationBean.getChronix());
        services.add(chronix);

        // Streams
        List<Stream> streams = new ArrayList<>();
        for (Datasource ds : datasources) {
            DatasourceFlowElements dsElem = new DatasourceFlowElements(ds, chronix.getName(), opcDataflowName,
                    sink.getName(), tagsApiService, logislandConfigurationBean.getOpc());

            if (dsElem.isActive()) {
                if (dsElem.getService() != null) services.add(dsElem.getService());
                if (dsElem.getStream() != null) streams.add(dsElem.getStream());
                ;
            }
        }
        df.setServices(services);
        df.setStreams(streams);
        return df;
    }

}