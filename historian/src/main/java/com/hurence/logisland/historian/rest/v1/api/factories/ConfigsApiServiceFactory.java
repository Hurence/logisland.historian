package com.hurence.logisland.historian.rest.v1.api.factories;

import com.hurence.logisland.historian.rest.v1.api.ConfigsApiService;
import com.hurence.logisland.historian.rest.v1.api.impl.ConfigsApiServiceImpl;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-10T20:51:14.764+02:00")
public class ConfigsApiServiceFactory {
    private final static ConfigsApiService service = new ConfigsApiServiceImpl();

    public static ConfigsApiService getConfigsApi() {
        return service;
    }
}
