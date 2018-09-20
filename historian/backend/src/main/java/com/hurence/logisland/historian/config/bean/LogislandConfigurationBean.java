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

package com.hurence.logisland.historian.config.bean;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@ConfigurationProperties(prefix = "logisland")
@Configuration
public class LogislandConfigurationBean {

    @NestedConfigurationProperty
    private ChronixConfigurationBean chronix;

    @NestedConfigurationProperty
    private OpcConfigurationBean opc = new OpcConfigurationBean();

    /**
     * If the last logisland ping is older than this duration, logisland will be considered out of sync.
     */
    private Duration dataflowFreshnessDuration = Duration.ofMinutes(1);

    /**
     * The name of the dataflow handled by this application.
     */
    private String opcDataflowName;

    public String getOpcDataflowName() {
        return opcDataflowName;
    }

    public void setOpcDataflowName(String opcDataflowName) {
        this.opcDataflowName = opcDataflowName;
    }

    public OpcConfigurationBean getOpc() {
        return opc;
    }

    public void setOpc(OpcConfigurationBean opc) {
        this.opc = opc;
    }

    public ChronixConfigurationBean getChronix() {
        return chronix;
    }

    public void setChronix(ChronixConfigurationBean chronix) {
        this.chronix = chronix;
    }

    public Duration getDataflowFreshnessDuration() {
        return dataflowFreshnessDuration;
    }

    public void setDataflowFreshnessDuration(Duration dataflowFreshnessDuration) {
        this.dataflowFreshnessDuration = dataflowFreshnessDuration;
    }
}
