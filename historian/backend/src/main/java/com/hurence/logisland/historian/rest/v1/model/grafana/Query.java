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

package com.hurence.logisland.historian.rest.v1.model.grafana;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.ArrayList;
import java.util.List;


@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "panelId",
        "range",
        "interval",
        "intervalMs",
        "targets",
        "maxDataPoints"
})
public class Query {

    @JsonProperty("panelId")
    private Long panelId;
    @JsonProperty("range")
    private Range range;
    @JsonProperty("interval")
    private String interval;
    @JsonProperty("intervalMs")
    private Long intervalMs;
    @JsonProperty("targets")
    private List<Target> targets = new ArrayList<Target>();
    @JsonProperty("maxDataPoints")
    private Long maxDataPoints;

    @JsonProperty("panelId")
    public Long getPanelId() {
        return panelId;
    }

    @JsonProperty("panelId")
    public void setPanelId(Long panelId) {
        this.panelId = panelId;
    }

    public Query withPanelId(Long panelId) {
        this.panelId = panelId;
        return this;
    }

    @JsonProperty("range")
    public Range getRange() {
        return range;
    }

    @JsonProperty("range")
    public void setRange(Range range) {
        this.range = range;
    }

    public Query withRange(Range range) {
        this.range = range;
        return this;
    }

    @JsonProperty("interval")
    public String getInterval() {
        return interval;
    }

    @JsonProperty("interval")
    public void setInterval(String interval) {
        this.interval = interval;
    }

    public Query withInterval(String interval) {
        this.interval = interval;
        return this;
    }

    @JsonProperty("intervalMs")
    public Long getIntervalMs() {
        return intervalMs;
    }

    @JsonProperty("intervalMs")
    public void setIntervalMs(Long intervalMs) {
        this.intervalMs = intervalMs;
    }

    public Query withIntervalMs(Long intervalMs) {
        this.intervalMs = intervalMs;
        return this;
    }

    @JsonProperty("targets")
    public List<Target> getTargets() {
        return targets;
    }

    @JsonProperty("targets")
    public void setTargets(List<Target> targets) {
        this.targets = targets;
    }

    public Query withTargets(List<Target> targets) {
        this.targets = targets;
        return this;
    }

    @JsonProperty("maxDataPoints")
    public Long getMaxDataPoints() {
        return maxDataPoints;
    }

    @JsonProperty("maxDataPoints")
    public void setMaxDataPoints(Long maxDataPoints) {
        this.maxDataPoints = maxDataPoints;
    }

    public Query withMaxDataPoints(Long maxDataPoints) {
        this.maxDataPoints = maxDataPoints;
        return this;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this).append("panelId", panelId).append("range", range).append("interval", interval).append("intervalMs", intervalMs).append("targets", targets).append("maxDataPoints", maxDataPoints).toString();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(maxDataPoints).append(interval).append(range).append(intervalMs).append(panelId).append(targets).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Query) == false) {
            return false;
        }
        Query rhs = ((Query) other);
        return new EqualsBuilder().append(maxDataPoints, rhs.maxDataPoints).append(interval, rhs.interval).append(range, rhs.range).append(intervalMs, rhs.intervalMs).append(panelId, rhs.panelId).append(targets, rhs.targets).isEquals();
    }

}



