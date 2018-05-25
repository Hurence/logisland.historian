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

import com.hurence.logisland.historian.dictionary.DatasourceTypes;
import com.hurence.logisland.historian.rest.v1.model.Datasource;
import com.hurence.opc.da.OpcDaConnectionProfile;
import com.hurence.opc.da.OpcDaOperations;
import org.springframework.boot.actuate.health.Health;

import java.time.Duration;

/**
 * OPC-DA datasource health checker.
 *
 * @author amarziali
 */
public class OpcDaDatasourceHealthChecker implements DatasourceHealthChecker {

    @Override
    public Health doHealthCheck(Datasource datasource) {
        if (datasource == null || !DatasourceTypes.OPC_DA_TYPE.equals(datasource.getDatasourceType())) {
            throw new IllegalArgumentException("Datasource is undefined or  type is not supported");
        }
        String hostParts[] = datasource.getHost().split(":");
        OpcDaConnectionProfile connectionProfile = new OpcDaConnectionProfile()
                .withSocketTimeout(Duration.ofSeconds(2))
                .withPassword(datasource.getPassword())
                .withHost(hostParts[0])
                .withDomain(datasource.getDomain())
                .withUser(datasource.getUser())
                .withComClsId(datasource.getClsid())
                .withComProgId(datasource.getProgId());
        if (hostParts.length > 1) {
            connectionProfile.setPort(Integer.parseInt(hostParts[1]));
        }

        try (OpcDaOperations opcDaOperations = new OpcDaOperations()) {
            opcDaOperations.connect(connectionProfile);
            if (opcDaOperations.awaitConnected()) {
                return Health.up().build();
            } else {
                return Health.down().withDetail("error", "Unable to reach datasource").build();
            }

        } catch (Exception e) {
            return Health.down(e).build();
        }
    }
}
