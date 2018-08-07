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
import com.hurence.opc.auth.UsernamePasswordCredentials;
import com.hurence.opc.da.OpcDaConnectionProfile;
import com.hurence.opc.da.OpcDaOperations;
import com.hurence.opc.da.OpcDaTemplate;
import org.springframework.boot.actuate.health.Health;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Duration;

/**
 * OPC-DA datasource health checker.
 *
 * @author amarziali
 */
public class OpcDaDatasourceHealthChecker implements DatasourceHealthChecker {

    @Override
    public Health doHealthCheck(Datasource datasource) {
        if (datasource == null || !Datasource.DatasourceTypeEnum.OPC_DA.equals(datasource.getDatasourceType())) {
            throw new IllegalArgumentException("Datasource is undefined or  type is not supported");
        }
        OpcDaConnectionProfile connectionProfile;
        try {
            connectionProfile = new OpcDaConnectionProfile()
                    .withComClsId(datasource.getClsid())
                    .withComProgId(datasource.getProgId())
                    .withDomain(datasource.getDomain())
                    .withCredentials(new UsernamePasswordCredentials()
                            .withUser(datasource.getUser())
                            .withPassword(datasource.getPassword()))
                    .withConnectionUri(new URI(datasource.getHost())) // TODO should be getUri
                    .withSocketTimeout(Duration.ofSeconds(2));
        } catch (URISyntaxException ex) {
            throw new IllegalArgumentException(String.format("Error while creating connection instance with host '%s'", datasource.getHost()), ex);
        }
        OpcDaOperations opcDaOperations = new OpcDaTemplate();
        try {
            opcDaOperations.connect(connectionProfile);
            if (opcDaOperations.awaitConnected()) {
                return Health.up().build();
            } else {
                return Health.down().withDetail("error", "Unable to reach datasource").build();
            }
        } catch (Exception e) {
            return Health.down(e).build();
        } finally {
            opcDaOperations.disconnect();
        }
    }
}
