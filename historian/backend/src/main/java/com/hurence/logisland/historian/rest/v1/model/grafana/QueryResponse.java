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

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class QueryResponse {

    private String target;
    private List<Number[]> datapoints = new ArrayList<>();

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public List<Number[]> getDatapoints() {
        return datapoints;
    }

    public void setDatapoints(List<Number[]> datapoints) {
        this.datapoints = datapoints;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QueryResponse that = (QueryResponse) o;
        return Objects.equals(target, that.target) &&
                Objects.equals(datapoints, that.datapoints);
    }

    @Override
    public int hashCode() {
        return Objects.hash(target, datapoints);
    }

    @Override
    public String toString() {
        return "QueryResponse{" +
                "target='" + target + '\'' +
                ", datapoints=" + datapoints +
                '}';
    }
}
