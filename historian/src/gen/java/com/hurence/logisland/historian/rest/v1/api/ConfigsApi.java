package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.*;
import com.hurence.logisland.historian.rest.v1.api.ConfigsApiService;
import com.hurence.logisland.historian.rest.v1.api.factories.ConfigsApiServiceFactory;

import io.swagger.annotations.ApiParam;
import io.swagger.jaxrs.*;

import com.hurence.logisland.historian.rest.v1.model.Error;
import com.hurence.logisland.historian.rest.v1.model.Property;

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

@Path("/configs")


@io.swagger.annotations.Api(description = "the configs API")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-10T20:51:14.764+02:00")
public class ConfigsApi  {
   private final ConfigsApiService delegate;

   public ConfigsApi(@Context ServletConfig servletContext) {
      ConfigsApiService delegate = null;

      if (servletContext != null) {
         String implClass = servletContext.getInitParameter("ConfigsApi.implementation");
         if (implClass != null && !"".equals(implClass.trim())) {
            try {
               delegate = (ConfigsApiService) Class.forName(implClass).newInstance();
            } catch (Exception e) {
               throw new RuntimeException(e);
            }
         } 
      }

      if (delegate == null) {
         delegate = ConfigsApiServiceFactory.getConfigsApi();
      }

      this.delegate = delegate;
   }

    @GET
    
    
    
    @io.swagger.annotations.ApiOperation(value = "global config", notes = "get all global configuration properties", response = Property.class, responseContainer = "List", tags={ "config", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "global configuration", response = Property.class, responseContainer = "List"),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response getConfig(@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getConfig(securityContext);
    }
}
