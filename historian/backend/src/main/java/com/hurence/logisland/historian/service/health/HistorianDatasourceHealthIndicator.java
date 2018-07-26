/*
 * Copyright (C) 2018 Hurence (support@hurence.com)
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.hurence.logisland.historian.service.health;

import com.hurence.logisland.historian.rest.v1.model.Datasource;
import com.hurence.logisland.historian.service.DatasourcesApiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.AbstractHealthIndicator;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.Status;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

/**
 * Health reporter for datasource objects.
 *
 * @author amarziali
 */
@Service
public class HistorianDatasourceHealthIndicator extends AbstractHealthIndicator {

    private final static Logger logger = LoggerFactory.getLogger(HistorianDatasourceHealthIndicator.class);
    private final static DatasourceHealthChecker unknownDatasourceChecker = (ds -> Health.unknown().build());
    private final static OpcDaDatasourceHealthChecker opcDaDatasourceChecker = new OpcDaDatasourceHealthChecker();
    private final static OpcUaDatasourceHealthChecker opcUaDatasourceChecker = new OpcUaDatasourceHealthChecker();

    @Autowired
    private DatasourcesApiService datasourcesApiService;


    @Override
    protected void doHealthCheck(Health.Builder builder) throws Exception {
        Map<String, Health> healthMap = datasourcesApiService.getAllDatasources(null)
                .stream()
                .collect(Collectors.toMap(Datasource::getId, this::healthCheckFor));

        boolean isDown = healthMap.values().stream().anyMatch(health -> !Status.UP.equals(health.getStatus()));
        if (isDown) {
            builder.down();
        } else {
            builder.up();
        }
        healthMap.forEach((id, health) -> {
            builder.withDetail(id, health);
        });

    }

    private Health healthCheckFor(Datasource ds) {
        try {
            return healthCheckerFor(ds).doHealthCheck(ds);
        } catch (Exception e) {
            logger.error("Exception occurred while checking health for datasource " + ds.getId(), e);
            return Health.down(e).build();
        }
    }

    private DatasourceHealthChecker healthCheckerFor(Datasource datasource) {
        if (datasource == null || datasource.getDatasourceType() == null) {
            logger.error("Datasource or its type cannot be null");
            return unknownDatasourceChecker;
        }
        switch (datasource.getDatasourceType()) {
            case OPC_DA:
                return opcDaDatasourceChecker;
            case OPC_UA:
                return opcUaDatasourceChecker;
            default:
                logger.warn("Unhandled datasource type {}", datasource.getDatasourceType());
                return unknownDatasourceChecker;
        }
    }
}
