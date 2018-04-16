package com.hurence.logisland.historian.rest.v1.api.factories;

import com.hurence.logisland.historian.rest.v1.api.ConfigsApiService;
import com.hurence.logisland.historian.rest.v1.api.impl.ConfigsApiServiceImpl;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-16T16:36:23.971+02:00")
public class ConfigsApiServiceFactory {
    private final static ConfigsApiService service = new ConfigsApiServiceImpl();

    public static ConfigsApiService getConfigsApi() {
        return service;
    }
}
