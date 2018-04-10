package com.hurence.logisland.historian.rest.v1.api.factories;

import com.hurence.logisland.historian.rest.v1.api.TagsApiService;
import com.hurence.logisland.historian.rest.v1.api.impl.TagsApiServiceImpl;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-10T20:51:14.764+02:00")
public class TagsApiServiceFactory {
    private final static TagsApiService service = new TagsApiServiceImpl();

    public static TagsApiService getTagsApi() {
        return service;
    }
}
