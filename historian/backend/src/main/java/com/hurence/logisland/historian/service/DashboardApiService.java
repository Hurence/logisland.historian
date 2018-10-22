/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.hurence.logisland.historian.service;

import com.hurence.logisland.historian.repository.SolrDashboardRepository;
import com.hurence.logisland.historian.rest.v1.model.dashboard.Dashboard;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class DashboardApiService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private SecurityService securityService;

    @Resource
    private SolrDashboardRepository repository;

    private long socketTimeoutMillis;

    @Autowired
    public void setSecurityService(SecurityService securityService) {
        this.securityService = securityService;
    }

    @Autowired
    public void setDashboardRepository(SolrDashboardRepository repository) {
        this.repository = repository;
    }

    @Value("${opc.socket.timeout:2000}")
    public void setSocketTimeoutMillis(long socketTimeoutMillis) {
        this.socketTimeoutMillis = socketTimeoutMillis;
    }

    public Optional<Dashboard> deleteDashboardByUid(String uid) {
        logger.info("deleting Dashboard {}", uid);
        Optional<Dashboard> dashboardToRemove = repository.findById(uid);
        if (dashboardToRemove.isPresent()) {
            repository.delete(dashboardToRemove.get());
        }
        return dashboardToRemove;
    }

    public void deleteDashboardByUidWithoutChecking(String uid) {
        logger.info("deleting Dashboard {}", uid);
        repository.deleteById(uid);
    }

    public Optional<Dashboard> getDashboardByUid(String uid) {
        logger.debug("getting Dashboard {}", uid);
        return repository.findById(uid);
    }

    public Optional<Dashboard> getDashboardByNameAndOwner(String name, String owner) {
        logger.debug("getting Dashboard with name '{}' and owner '{}'", name, owner);
        return repository.findByNameAndOwner(name, owner);
    }


    private Optional<Dashboard> updateDashboard(Dashboard dashboard) {
        logger.debug("updating Dashboard {}", dashboard.getId());
        if (repository.existsById(dashboard.getId())) {
            return Optional.of(repository.save(dashboard));
        } else {
            logger.error("Dashboard {} not found, unable to update", dashboard.getId());
            return Optional.empty();
        }
    }

    private Dashboard updateDashboardWithoutChecking(Dashboard dashboard) {
        logger.debug("updating Dashboard {}", dashboard.getId());
        return repository.save(dashboard);
    }

    /**
     * return updated dashboard or empty if dashboard does not yet exist
     * @param dashboard
     * @param uid
     * @return
     */
    public Optional<Dashboard> updateDashboard(Dashboard dashboard, String uid) {
        if (!dashboard.getId().equals(uid)) {
            return updateDashboard(dashboard.uid(uid));
        } else {
            return updateDashboard(dashboard);
        }
    }

    public Dashboard updateDashboardWithoutChecking(Dashboard dashboard, String uid) {
        if (!dashboard.getId().equals(uid)) {
            return updateDashboardWithoutChecking(dashboard.uid(uid));
        } else {
            return updateDashboardWithoutChecking(dashboard);
        }
    }

    public Optional<Dashboard> addDashboardWithUid(Dashboard dashboard, String uid) {
        Optional<Dashboard> dashboardToRemove = getDashboardByUid(uid);
        if (dashboardToRemove.isPresent()) {
            logger.info("Dashboard already {} exists, delete it first", uid);
            return Optional.empty();
        } else {
            dashboard.uid(uid);
            return Optional.of(repository.save(dashboard));
        }
    }

    public List<Dashboard> getAllUserDashboard() {
        return repository.findByOwner(this.securityService.getUserName());
    }
}