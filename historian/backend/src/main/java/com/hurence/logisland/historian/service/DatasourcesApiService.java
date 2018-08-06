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

import com.hurence.logisland.historian.repository.SolrDatasourceRepository;
import com.hurence.logisland.historian.rest.v1.model.Datasource;
import com.hurence.logisland.historian.rest.v1.model.operation_report.DatasourceReplaceReport;
import com.hurence.logisland.historian.rest.v1.model.operation_report.ReplaceReport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class DatasourcesApiService {


    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private DataflowsApiService dataflowsApiService;
    private TagsApiService tagsApiService;

    @Autowired
    public void setDataflowsApiService(DataflowsApiService dataflowsApiService) {
        this.dataflowsApiService = dataflowsApiService;
    }

    @Autowired
    public void setTagsApiService(TagsApiService tagsApiService) {
        this.tagsApiService = tagsApiService;
    }

    @Resource
    private SolrDatasourceRepository repository;


    public Optional<Datasource> deleteDatasource(String itemId) {

        logger.info("deleting Datasource {}", itemId);
        Optional<Datasource> datasourceToRemove = repository.findById(itemId);
        if (datasourceToRemove.isPresent()) {
            repository.delete(datasourceToRemove.get());
            long numberOfTagDeleted = tagsApiService.deleteTagsOfDatasource(datasourceToRemove.get().getId());
            dataflowsApiService.updateOpcDataflow();
        }
        return datasourceToRemove;
    }


    public Optional<Datasource> getDatasource(String itemId) {
        logger.debug("getting Datasource {}", itemId);
        return repository.findById(itemId);
    }

    public List<Datasource> getAllDatasources(String fq) {

        String query = fq;
        if (fq == null || fq.isEmpty())
            query = "*";


        List<Datasource> Datasources = repository.findByText(query);

        return Datasources;


    }

    private ReplaceReport<Datasource> createOrReplaceADatasource(Datasource datasource) {
        logger.debug("create or replace Datasource {}", datasource.getId());
        if (repository.existsById(datasource.getId())) {
            Datasource savedDatasource = repository.save(datasource);
            dataflowsApiService.updateOpcDataflow();
            return new DatasourceReplaceReport(savedDatasource, false);
        } else {
            Datasource savedDatasource = repository.save(datasource);
            dataflowsApiService.updateOpcDataflow();
            return new DatasourceReplaceReport(savedDatasource, true);
        }
    }

    public ReplaceReport<Datasource> createOrReplaceADatasource(Datasource datasource, String itemId) {
        if (!datasource.getId().equals(itemId)) {
            return createOrReplaceADatasource(datasource.id(itemId));
        } else {
            return createOrReplaceADatasource(datasource);
        }
    }
}