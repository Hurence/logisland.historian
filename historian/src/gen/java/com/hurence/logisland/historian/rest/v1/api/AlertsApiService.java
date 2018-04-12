package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.api.*;
import com.hurence.logisland.historian.rest.v1.model.*;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

import com.hurence.logisland.historian.rest.v1.model.Alert;
import com.hurence.logisland.historian.rest.v1.model.Error;

import java.util.List;
import com.hurence.logisland.historian.rest.v1.api.NotFoundException;

import java.io.InputStream;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.validation.constraints.*;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-10T20:51:14.764+02:00")
public abstract class AlertsApiService {
    public abstract Response getAlerts( Integer count,SecurityContext securityContext) throws NotFoundException;
}
