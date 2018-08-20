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

import com.hurence.logisland.historian.config.bean.LogislandConfigurationBean;
import com.hurence.logisland.historian.repository.SolrDataflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.AbstractHealthIndicator;
import org.springframework.boot.actuate.health.Health;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class LogislandDataflowHealthIndicator extends AbstractHealthIndicator {

    private final SolrDataflowRepository solrDataflowRepository;
    private final LogislandConfigurationBean logislandConfigurationBean;

    @Autowired
    public LogislandDataflowHealthIndicator(SolrDataflowRepository solrDataflowRepository, LogislandConfigurationBean logislandConfigurationBean) {
        this.solrDataflowRepository = solrDataflowRepository;
        this.logislandConfigurationBean = logislandConfigurationBean;
    }

    @Override
    protected void doHealthCheck(Health.Builder builder) throws Exception {
        AtomicBoolean up = new AtomicBoolean();
        Instant now = Instant.now();
        solrDataflowRepository.findAll().forEach(dataFlowSimple -> {
            builder.withDetail(dataFlowSimple.getId(), dataFlowSimple.getLastPingDateTime());
            if (dataFlowSimple.getLastPingDateTime() == null ||
                    logislandConfigurationBean.getDataflowFreshnessDuration().toMillis() < (now.toEpochMilli() - dataFlowSimple.getLastPingDateTime().getTime())) {
                up.compareAndSet(true, true);
            }
        });
        if (up.get()) {
            builder.up();
        } else {
            builder.down();
        }
    }
}
