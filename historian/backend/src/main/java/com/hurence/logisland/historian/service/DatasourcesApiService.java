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
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class DatasourcesApiService {


  
    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @Resource
    private SolrDatasourceRepository repository;

    @Resource(name = "solrTemplate")
    private SolrTemplate solrTemplate;




    public Optional<Datasource> deleteDatasource(String itemId) {

        logger.info("deleting Datasource " + itemId);
        Datasource DatasourceToRemove = solrTemplate.getById(itemId, Datasource.class);
        if (DatasourceToRemove != null) {
            repository.delete(itemId);
            return Optional.of(DatasourceToRemove);
        } else
            return Optional.empty();

    }


    public Optional<Datasource> getDatasource(String itemId) {
        logger.debug("getting Datasource " + itemId);
        Datasource Datasource = solrTemplate.getById(itemId, Datasource.class);
        if (Datasource != null) {
            return Optional.of(Datasource);
        } else {
            logger.debug("Datasource " + itemId + " not found");
            return Optional.empty();
        }
    }


    public Optional<Datasource> updateDatasource(Datasource Datasource) {
        logger.debug("updating Datasource " + Datasource.getId());
        Optional<Datasource> DatasourceToUpdate = getDatasource(Datasource.getId());
        if (DatasourceToUpdate.isPresent()) {
            solrTemplate.saveBean(Datasource);
            return Optional.of(Datasource);
        } else {
            logger.error("Datasource " + Datasource.getId() + " not found, unable to update");
            return Optional.empty();
        }
    }

    public Optional<Datasource> updateDatasource(Datasource Datasource, String itemId) {
        if (!Datasource.getId().equals(itemId)) {
            return updateDatasource(Datasource.id(itemId));
        } else {
            return updateDatasource(Datasource);
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

        logger.info("Datasource already {} exists, delete it first", itemId);

        Datasource DatasourceToRemove = solrTemplate.getById(itemId, Datasource.class);
        if (DatasourceToRemove != null) {
            return Optional.empty();
        } else {

            body.setId(itemId);
            // body.id( "/" + body.getDomain() + "/" + body.getServer() + "/" + body.getGroup() + "/" + body.getDatasourceName())
            repository.save(body);
            return Optional.of(body);
        }

    }
}