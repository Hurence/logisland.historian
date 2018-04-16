package com.hurence.logisland.historian.rest.v1.api.impl;

import com.hurence.logisland.historian.rest.v1.api.*;
import com.hurence.logisland.historian.rest.v1.model.*;

import com.hurence.logisland.historian.rest.v1.model.Alert;
import com.hurence.logisland.historian.rest.v1.model.Error;

import java.util.List;
import com.hurence.logisland.historian.rest.v1.api.NotFoundException;

import java.io.InputStream;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.validation.constraints.*;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-16T16:36:23.971+02:00")
public class AlertsApiServiceImpl extends AlertsApiService {
    @Override
    public Response getAlerts( Integer count,  Integer severity,  String start,  String end, SecurityContext securityContext) throws NotFoundException {
        // do some magic!
        return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!")).build();
    }
}
