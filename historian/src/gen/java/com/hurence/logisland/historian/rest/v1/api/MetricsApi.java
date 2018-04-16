package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.*;
import com.hurence.logisland.historian.rest.v1.api.MetricsApiService;
import com.hurence.logisland.historian.rest.v1.api.factories.MetricsApiServiceFactory;

import io.swagger.annotations.ApiParam;
import io.swagger.jaxrs.*;

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

@Path("/metrics")


@io.swagger.annotations.Api(description = "the metrics API")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-16T16:36:23.971+02:00")
public class MetricsApi  {
   private final MetricsApiService delegate;

   public MetricsApi(@Context ServletConfig servletContext) {
      MetricsApiService delegate = null;

      if (servletContext != null) {
         String implClass = servletContext.getInitParameter("MetricsApi.implementation");
         if (implClass != null && !"".equals(implClass.trim())) {
            try {
               delegate = (MetricsApiService) Class.forName(implClass).newInstance();
            } catch (Exception e) {
               throw new RuntimeException(e);
            }
         } 
      }

      if (delegate == null) {
         delegate = MetricsApiServiceFactory.getMetricsApi();
      }

      this.delegate = delegate;
   }

    @GET
    
    
    @Produces({ "text/plain" })
    @io.swagger.annotations.ApiOperation(value = "retrieve all job metrics in Prometheus format", notes = "get Prometheus metrics. have a look to https://prometheus.io/docs/instrumenting/exposition_formats/", response = String.class, tags={ "metrology", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "metrics", response = String.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response getMetrics(@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getMetrics(securityContext);
    }
}
