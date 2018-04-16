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
package com.hurence.logisland.historian.config;

import com.hurence.logisland.historian.service.TagService;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.solr.core.SolrOperations;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.data.solr.repository.config.EnableSolrRepositories;
import org.springframework.data.solr.server.SolrClientFactory;
import org.springframework.data.solr.server.support.HttpSolrClientFactory;

import java.net.MalformedURLException;

@Configuration
@PropertySource("classpath:/application.yml")
@EnableSolrRepositories(basePackages = {"com.hurence.logisland.historian.repository"}, multicoreSupport = true)
public class SolrConfig {


    private @Value("${solr.host}")
    String solrHost;
    private @Value("${solr.port}")
    String solrPort;
    private @Value("${solr.core}")
    String solrCore;


    @Bean
    SolrTemplate solrTemplate() {
        return new SolrTemplate(solrServerFactory());
    }

    @Bean
    SolrClientFactory solrServerFactory() {

        Credentials credentials = new UsernamePasswordCredentials("solr", "SolrRocks");
        return new HttpSolrClientFactory(solrClient(), "", credentials , "BASIC");
    }

    @Bean
    SolrClient solrClient() {
        return new HttpSolrClient("http://localhost:8983/solr");
    }


}