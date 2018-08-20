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

package com.hurence.logisland.historian.repository;

import java.time.Instant;
import java.util.Date;

public interface CustomSolrDataflowRepository {

    /**
     * Makes a partial update by setting the pingDateTime to the provided instant.
     * @param dataflowId
     * @param date
     */
    void updatePingTimestamp(String dataflowId, Date date);

}
