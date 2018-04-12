package com.hurence.logisland.historian.rest.v1.api.factories;

import com.hurence.logisland.historian.rest.v1.api.JobsApiService;
import com.hurence.logisland.historian.rest.v1.api.impl.JobsApiServiceImpl;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-10T20:51:14.764+02:00")
public class JobsApiServiceFactory {
    private final static JobsApiService service = new JobsApiServiceImpl();

    public static JobsApiService getJobsApi() {
        return service;
    }
}
