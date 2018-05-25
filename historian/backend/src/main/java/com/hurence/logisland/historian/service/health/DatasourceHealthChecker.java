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
import org.springframework.boot.actuate.health.Health;

/**
 * Api interface to check for a {@link Datasource} health.
 *
 * @author amarziali
 */
@FunctionalInterface
public interface DatasourceHealthChecker {

    /**
     * Checks for health.
     * @param datasource the datasource to check.
     * @return an actuator {@link Health} information (never null).
     */
    Health doHealthCheck(Datasource datasource);
}
