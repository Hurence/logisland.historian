package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.*;
import com.hurence.logisland.historian.rest.v1.api.AlertsApiService;
import com.hurence.logisland.historian.rest.v1.api.factories.AlertsApiServiceFactory;

import io.swagger.annotations.ApiParam;
import io.swagger.jaxrs.*;

import com.hurence.logisland.historian.rest.v1.model.Alert;
import com.hurence.logisland.historian.rest.v1.model.Error;

import java.util.Map;
import java.util.List;
import com.hurence.logisland.historian.rest.v1.api.NotFoundException;

import java.io.InputStream;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.servlet.ServletConfig;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.*;
import javax.validation.constraints.*;

@Path("/alerts")


@io.swagger.annotations.Api(description = "the alerts API")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-16T16:36:23.971+02:00")
public class AlertsApi  {
   private final AlertsApiService delegate;

   public AlertsApi(@Context ServletConfig servletContext) {
      AlertsApiService delegate = null;

      if (servletContext != null) {
         String implClass = servletContext.getInitParameter("AlertsApi.implementation");
         if (implClass != null && !"".equals(implClass.trim())) {
            try {
               delegate = (AlertsApiService) Class.forName(implClass).newInstance();
            } catch (Exception e) {
               throw new RuntimeException(e);
            }
         } 
      }

      if (delegate == null) {
         delegate = AlertsApiServiceFactory.getAlertsApi();
      }

      this.delegate = delegate;
   }

    @GET
    
    
    
    @io.swagger.annotations.ApiOperation(value = "get all alerts", notes = "get the alerts", response = Alert.class, responseContainer = "List", tags={ "alerts", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "job metrics", response = Alert.class, responseContainer = "List"),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response getAlerts(@ApiParam(value = "max number of ites to retrieve", defaultValue="20") @DefaultValue("20") @QueryParam("count") Integer count
,@ApiParam(value = "severity level (the higher the most severe)", defaultValue="0") @DefaultValue("0") @QueryParam("severity") Integer severity
,@ApiParam(value = "lower date range", defaultValue="1DAYS-AGO") @DefaultValue("1DAYS-AGO") @QueryParam("start") String start
,@ApiParam(value = "upper date range", defaultValue="NOW") @DefaultValue("NOW") @QueryParam("end") String end
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getAlerts(count,severity,start,end,securityContext);
    }
}
