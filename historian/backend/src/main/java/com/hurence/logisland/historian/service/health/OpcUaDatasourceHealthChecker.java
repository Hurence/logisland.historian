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
import com.hurence.opc.ua.OpcUaConnectionProfile;
import com.hurence.opc.ua.OpcUaOperations;
import com.hurence.opc.ua.OpcUaTemplate;
import org.springframework.boot.actuate.health.Health;

import java.net.URI;
import java.time.Duration;

/**
 * OPC-DA datasource health checker.
 *
 * @author amarziali
 */
public class OpcUaDatasourceHealthChecker implements DatasourceHealthChecker {

    @Override
    public Health doHealthCheck(Datasource datasource) {
        if (datasource == null || !Datasource.DatasourceTypeEnum.OPC_UA.equals(datasource.getDatasourceType())) {
            throw new IllegalArgumentException("Datasource is undefined or  type is not supported");
        }
        OpcUaConnectionProfile connectionProfile = new OpcUaConnectionProfile()
                .withConnectionUri(URI.create(datasource.getHost()))//"opc.tcp://localhost:53530/OPCUA/SimulationServer"
                .withClientIdUri("none")//hurence:opc-simple:client:test
                .withClientName("Simple OPC test client")
                .withSocketTimeout(Duration.ofSeconds(2));

        OpcUaOperations opcUaOperations = new OpcUaTemplate();
        try {
            opcUaOperations.connect(connectionProfile);
            if (opcUaOperations.awaitConnected()) {
                return Health.up().build();
            } else {
                return Health.down().withDetail("error", "Unable to reach datasource").build();
            }
        } catch (Exception e) {
            return Health.down(e).build();
        } finally {
            opcUaOperations.disconnect();
        }
    }
}
