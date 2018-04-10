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


import com.hurence.logisland.historian.rest.v1.HelloResource;
import io.swagger.jaxrs.config.BeanConfig;
import io.swagger.jaxrs.listing.ApiListingResource;
import io.swagger.jaxrs.listing.SwaggerSerializers;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.wadl.internal.WadlResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class JerseyConfig extends ResourceConfig {

    @Value("${spring.jersey.application-path:/}")
    private String apiPath;

    public JerseyConfig() {
        // Register endpoints, providers, ...
        this.registerEndpoints();
    }

    @PostConstruct
    public void init() {
        // Register components where DI is needed
        this.configureSwagger();
    }

    private void registerEndpoints() {
        this.register(HelloResource.class);
        // Access through /<Jersey's servlet path>/application.wadl
        this.register(WadlResource.class);
    }

    private void configureSwagger() {
        // Available at localhost:port/api/swagger.json
        this.register(ApiListingResource.class);
        this.register(SwaggerSerializers.class);
        this.register(CORSResponseFilter.class);

        BeanConfig config = new BeanConfig();
        config.setConfigId("springboot-jersey-swagger-docker-example");
        config.setTitle("Spring Boot + Jersey + Swagger + Docker Example");
        config.setVersion("v1");
        config.setContact("Thomas Bailet");
        config.setSchemes(new String[]{"http", "https"});
        config.setBasePath(this.apiPath);
        config.setResourcePackage("com.hurence.logisland.historian.rest.v1");
        config.setPrettyPrint(true);
        config.setScan(true);
    }
}
