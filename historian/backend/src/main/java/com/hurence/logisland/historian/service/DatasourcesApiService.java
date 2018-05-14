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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class DatasourcesApiService {


    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @Resource
    private SolrDatasourceRepository repository;


    public Optional<Datasource> deleteDatasource(String itemId) {

        logger.info("deleting Datasource {}", itemId);
        Optional<Datasource> datasourceToRemove = repository.findById(itemId);
        if (datasourceToRemove.isPresent()) {
            repository.delete(datasourceToRemove.get());
        }
        return datasourceToRemove;
    }


    public Optional<Datasource> getDatasource(String itemId) {
        logger.debug("getting Datasource {}", itemId);
        return repository.findById(itemId);
    }


    public Optional<Datasource> updateDatasource(Datasource datasource) {
        logger.debug("updating Datasource {}", datasource.getId());
        Optional<Datasource> datasourceToUpdate = getDatasource(datasource.getId());
        if (datasourceToUpdate.isPresent()) {
            return Optional.of(repository.save(datasource));
        } else {
            logger.error("Datasource {} not found, unable to update", datasource.getId());
            return Optional.empty();
        }
    }

    public Optional<Datasource> updateDatasource(Datasource datasource, String itemId) {
        if (!itemId.equals(datasource.getId())) {
            return updateDatasource(datasource.id(itemId));
        } else {
            return updateDatasource(datasource);
        }
    }


    public List<Datasource> getAllDatasources(String fq) {

        String query = fq;
        if (fq == null || fq.isEmpty())
            query = "*";


        List<Datasource> Datasources = repository.findByText(query);

        return Datasources;


    }

    public Optional<Datasource> addDatasourceWithId(Datasource body, String itemId) {

        Optional<Datasource> datasourceToRemove = getDatasource(itemId);
        if (datasourceToRemove.isPresent()) {
            logger.info("Datasource already {} exists, delete it first", itemId);
            return Optional.empty();
        } else {
            body.setId(itemId);
            return Optional.of(repository.save(body));
        }

    }
}