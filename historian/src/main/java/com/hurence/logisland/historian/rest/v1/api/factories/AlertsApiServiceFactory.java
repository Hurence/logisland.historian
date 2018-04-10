package com.hurence.logisland.historian.rest.v1.api.factories;

import com.hurence.logisland.historian.rest.v1.api.AlertsApiService;
import com.hurence.logisland.historian.rest.v1.api.impl.AlertsApiServiceImpl;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-10T20:51:14.764+02:00")
public class AlertsApiServiceFactory {
    private final static AlertsApiService service = new AlertsApiServiceImpl();

    public static AlertsApiService getAlertsApi() {
        return service;
    }
}
