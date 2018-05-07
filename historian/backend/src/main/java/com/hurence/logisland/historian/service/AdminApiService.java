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
import com.hurence.logisland.historian.repository.SolrTagRepository;
import com.hurence.logisland.historian.rest.v1.model.Datasource;
import com.hurence.logisland.historian.rest.v1.model.IdUtils;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.solr.core.SolrOperations;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

@Service
public class AdminApiService {


    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private static final String TAGS_LIST = "tags";

    @Resource
    private SolrTagRepository solrTagRepository;

    @Resource
    private SolrDatasourceRepository solrDatasourceRepository;


    @Autowired
    private SolrOperations solrTemplate;


    // inject the template as ListOperations
    private ListOperations<String, Object> listOps;


    private List<String> domains = Arrays.asList("hurence", "pear", "gizmo");
    private List<String> servers = Arrays.asList("opc-server1", "opc-server2", "opc-server3");
    private List<String> groups = Arrays.asList("temp.group1", "temp.group2", "freq.group1", "freq.group2");


    public List<Tag> generateSampleTags(boolean doFlush) {

        List<Tag> tags = new ArrayList<>();

        long tagsCount = listOps.size(TAGS_LIST);
        if (doFlush) {
            while (tagsCount > 0) {
                listOps.leftPop(TAGS_LIST);
                tagsCount--;
            }
        }

        Random random = new Random();
        tagsCount = random.nextInt(20);

        while (tagsCount > 0) {

            String domain = domains.get(random.nextInt(domains.size()));
            String server = servers.get(random.nextInt(servers.size()));
            String group = groups.get(random.nextInt(groups.size()));
            String tag = UUID.randomUUID().toString().substring(0, 5);
            Tag t = IdUtils.setId(new Tag()
                    .domain(domain)
                    .server(server)
                    .group(group)
                    .tagName(tag));

            tags.add(t);
            solrTagRepository.save(t);

            listOps.leftPush(TAGS_LIST, t);
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

}