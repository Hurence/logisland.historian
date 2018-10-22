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

package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.PrivateSelection;
import com.hurence.logisland.historian.rest.v1.model.Selection;
import com.hurence.logisland.historian.rest.v1.model.dashboard.Dashboard;
import com.hurence.logisland.historian.rest.v1.model.grafana.Query;
import com.hurence.logisland.historian.service.DashboardApiService;
import com.hurence.logisland.historian.service.SecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/dashboards")
public class DashboardApiController {


    private static final Logger log = LoggerFactory.getLogger(SelectionsApiController.class);

    private final DashboardApiService service;
    private final SecurityService securityService;


    @org.springframework.beans.factory.annotation.Autowired
    public DashboardApiController(DashboardApiService service,
                                   SecurityService securityService) {
        this.service = service;
        this.securityService = securityService;
    }


    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Dashboard> getUserDashboards() {
        return this.service.getAllUserDashboard();
    }

    @RequestMapping(value = "/create",
            method = RequestMethod.POST)
    public ResponseEntity<Dashboard> createDashboard(@RequestBody Dashboard dashboard) {
        Optional<Dashboard> dashboardExist = service.getDashboardByNameAndOwner(dashboard.getName(), dashboard.getOwner());
        if (dashboardExist.isPresent()) { // Already exist
            return new ResponseEntity<Dashboard>(HttpStatus.BAD_REQUEST);
        } else {
            Optional<Dashboard> dashboardCreated = service.addDashboardWithUid(dashboard, UUID.randomUUID().toString());
            if (dashboardCreated.isPresent()) {
                return new ResponseEntity<Dashboard>(dashboardCreated.get(), HttpStatus.OK);
            } else { // Save failed (uuid generated already exist)
                return new ResponseEntity<Dashboard>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @RequestMapping(value = "/{uid}",
            method = RequestMethod.GET)
    public ResponseEntity<Dashboard> getDashboard(@PathVariable("uid") String uid) {
        Optional<Dashboard> dashboardExisted = service.getDashboardByUid(uid);
        if (dashboardExisted.isPresent()) {
            Dashboard dashboard = dashboardExisted.get();
            String user = securityService.getUserName();
            if (dashboard.getOwner() != null) {
                if (!user.equals(dashboard.getOwner())) {
                    return new ResponseEntity<Dashboard>(HttpStatus.UNAUTHORIZED);
                }
            }
            return new ResponseEntity<Dashboard>(dashboard, HttpStatus.OK);
        } else {
            return new ResponseEntity<Dashboard>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/{uid}",
            method = RequestMethod.DELETE)
    public ResponseEntity<Dashboard> deleteDashboard(@PathVariable("uid") String uid) {
        Optional<Dashboard> dashboardExisted = service.getDashboardByUid(uid);
        if (dashboardExisted.isPresent()) {
            Dashboard dashboard = dashboardExisted.get();
            String user = securityService.getUserName();
            if (dashboard.getOwner() != null) {
                if (!user.equals(dashboard.getOwner())) {
                    return new ResponseEntity<Dashboard>(HttpStatus.UNAUTHORIZED);
                }
            }
            service.deleteDashboardByUidWithoutChecking(uid);
            return new ResponseEntity<Dashboard>(dashboard, HttpStatus.OK);
        } else {
            return new ResponseEntity<Dashboard>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/{uid}",
            method = RequestMethod.PUT)
    public ResponseEntity<Dashboard> replaceDashboard(@PathVariable("uid") String uid,
                                                      @RequestBody Dashboard dashboard) {
        Optional<Dashboard> dashboardExisted = service.getDashboardByUid(uid);
        if (dashboardExisted.isPresent()) {
            Dashboard oldDashboard = dashboardExisted.get();
            String user = securityService.getUserName();
            if (oldDashboard.getOwner() != null) {
                if (!user.equals(oldDashboard.getOwner())) {
                    return new ResponseEntity<Dashboard>(HttpStatus.UNAUTHORIZED);
                }
            }
            Dashboard dashboardCreated = service.updateDashboardWithoutChecking(dashboard, uid);
            return new ResponseEntity<Dashboard>(dashboardCreated, HttpStatus.OK);
        } else {
            return new ResponseEntity<Dashboard>(HttpStatus.NOT_FOUND);
        }
    }
}
