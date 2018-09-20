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

import java.net.URL;
import java.time.Duration;
import java.util.List;

public class ChronixConfigurationBean {

    private URL connectionUrl;
    private String defaultCollection;
    private boolean solrCloud;
    private Duration flushInterval;
    private Long batchSize;
    private List<String> groupByFields;

    public URL getConnectionUrl() {
        return connectionUrl;
    }

    public void setConnectionUrl(URL connectionUrl) {
        this.connectionUrl = connectionUrl;
    }

    public String getDefaultCollection() {
        return defaultCollection;
    }

    public void setDefaultCollection(String defaultCollection) {
        this.defaultCollection = defaultCollection;
    }

    public boolean isSolrCloud() {
        return solrCloud;
    }

    public void setSolrCloud(boolean solrCloud) {
        this.solrCloud = solrCloud;
    }

    public Duration getFlushInterval() {
        return flushInterval;
    }

    public void setFlushInterval(Duration flushInterval) {
        this.flushInterval = flushInterval;
    }

    public Long getBatchSize() {
        return batchSize;
    }

    public void setBatchSize(Long batchSize) {
        this.batchSize = batchSize;
    }

    public List<String> getGroupByFields() {
        return groupByFields;
    }

    public void setGroupByFields(List<String> groupByFields) {
        this.groupByFields = groupByFields;
    }
}