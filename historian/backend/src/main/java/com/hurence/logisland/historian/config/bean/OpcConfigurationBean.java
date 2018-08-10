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

import java.time.Duration;

public class OpcConfigurationBean {

    public static class UaConfigurationBean {
        private Duration sessionPublicationRate = Duration.ofSeconds(5);

        public Duration getSessionPublicationRate() {
            return sessionPublicationRate;
        }

        public void setSessionPublicationRate(Duration sessionPublicationRate) {
            this.sessionPublicationRate = sessionPublicationRate;
        }
    }

    public static class DaConfigurationBean {
        private boolean directRead;
        private Duration minimumSessionGroupRefreshRate = Duration.ofSeconds(5);

        public boolean isDirectRead() {
            return directRead;
        }

        public void setDirectRead(boolean directRead) {
            this.directRead = directRead;
        }

        public Duration getMinimumSessionGroupRefreshRate() {
            return minimumSessionGroupRefreshRate;
        }

        public void setMinimumSessionGroupRefreshRate(Duration minimumSessionGroupRefreshRate) {
            this.minimumSessionGroupRefreshRate = minimumSessionGroupRefreshRate;
        }
    }

    private DaConfigurationBean da = new DaConfigurationBean();
    private UaConfigurationBean ua = new UaConfigurationBean();
    private Duration defaultSocketTimeout = Duration.ofSeconds(30);

    public DaConfigurationBean getDa() {
        return da;
    }

    public void setDa(DaConfigurationBean da) {
        this.da = da;
    }

    public UaConfigurationBean getUa() {
        return ua;
    }

    public void setUa(UaConfigurationBean ua) {
        this.ua = ua;
    }

    public Duration getDefaultSocketTimeout() {
        return defaultSocketTimeout;
    }

    public void setDefaultSocketTimeout(Duration defaultSocketTimeout) {
        this.defaultSocketTimeout = defaultSocketTimeout;
    }
}
