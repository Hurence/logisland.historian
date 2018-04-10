package com.hurence.logisland.historian.rest.v1.api.factories;

import com.hurence.logisland.historian.rest.v1.api.MetricsApiService;
import com.hurence.logisland.historian.rest.v1.api.impl.MetricsApiServiceImpl;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-10T20:51:14.764+02:00")
public class MetricsApiServiceFactory {
    private final static MetricsApiService service = new MetricsApiServiceImpl();

    public static MetricsApiService getMetricsApi() {
        return service;
    }
}
