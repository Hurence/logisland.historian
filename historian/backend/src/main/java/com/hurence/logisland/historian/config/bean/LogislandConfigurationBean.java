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

@ConfigurationProperties(prefix = "logisland")
@Configuration
public class LogislandConfigurationBean {

    @NestedConfigurationProperty
    private ChronixConfigurationBean chronix;

    @NestedConfigurationProperty
    private OpcConfigurationBean opc = new OpcConfigurationBean();

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
}
