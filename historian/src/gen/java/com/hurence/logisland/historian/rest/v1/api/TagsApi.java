package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.*;
import com.hurence.logisland.historian.rest.v1.api.TagsApiService;
import com.hurence.logisland.historian.rest.v1.api.factories.TagsApiServiceFactory;

import io.swagger.annotations.ApiParam;
import io.swagger.jaxrs.*;

import com.hurence.logisland.historian.rest.v1.model.Error;
import com.hurence.logisland.historian.rest.v1.model.Tag;

import java.util.Map;
import java.util.List;
import com.hurence.logisland.historian.rest.v1.api.NotFoundException;

import java.io.InputStream;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.springframework.cache.annotation.CachePut;

import javax.servlet.ServletConfig;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.*;
import javax.validation.constraints.*;

@Path("/tags")


@io.swagger.annotations.Api(description = "the tags API")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-10T20:51:14.764+02:00")
public class TagsApi  {
   private final TagsApiService delegate;

   public TagsApi(@Context ServletConfig servletContext) {
      TagsApiService delegate = null;

      if (servletContext != null) {
         String implClass = servletContext.getInitParameter("TagsApi.implementation");
         if (implClass != null && !"".equals(implClass.trim())) {
            try {
               delegate = (TagsApiService) Class.forName(implClass).newInstance();
            } catch (Exception e) {
               throw new RuntimeException(e);
            }
         } 
      }

      if (delegate == null) {
         delegate = TagsApiServiceFactory.getTagsApi();
      }

      this.delegate = delegate;
   }

    @POST
    
    
    
    @io.swagger.annotations.ApiOperation(value = "create new tag", notes = "store a new tag", response = Tag.class, tags={ "tag","opc", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Tag successfuly created", response = Tag.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid ID supplied", response = Void.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response addTag(@ApiParam(value = "Tag to add" ,required=true) Tag tag
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.addTag(tag,securityContext);
    }
    @POST
    @Path("/{itemId}")
    @CachePut(value = "tag", key = "#tag.id")
    
    @io.swagger.annotations.ApiOperation(value = "create new tag", notes = "store a new tag", response = Tag.class, tags={ "tag", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Tag successfuly created", response = Tag.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid ID supplied", response = Void.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response addTagWithId(@ApiParam(value = "Tag resource to add" ,required=true) Tag body
,@ApiParam(value = "itemId to",required=true) @PathParam("itemId") String itemId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.addTagWithId(body,itemId,securityContext);
    }
    @DELETE
    @Path("/{itemId}")
    
    
    @io.swagger.annotations.ApiOperation(value = "delete tag", notes = "remove the corresponding Tag", response = Tag.class, tags={ "tag", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Tag successfully removed", response = Tag.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid ID supplied", response = Void.class),
        
        @io.swagger.annotations.ApiResponse(code = 404, message = "Tag resource not found", response = Void.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response deleteTag(@ApiParam(value = "id of the tag to be deleted",required=true) @PathParam("itemId") String itemId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.deleteTag(itemId,securityContext);
    }
    @GET
    
    
    @Produces({ "application/json" })
    @io.swagger.annotations.ApiOperation(value = "get all OPC tags", notes = "retrieve all OPC tags", response = Tag.class, responseContainer = "List", tags={ "tag","opc", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "tags list", response = Tag.class, responseContainer = "List"),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response getAllTags(@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getAllTags(securityContext);
    }
    @GET
    @Path("/{itemId}")
    
    @Produces({ "application/json" })
    @io.swagger.annotations.ApiOperation(value = "get tag", notes = "get the corresponding Tag", response = Tag.class, tags={ "tag", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "tag", response = Tag.class),
        
        @io.swagger.annotations.ApiResponse(code = 404, message = "Tag resource not found", response = Void.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response getTag(@ApiParam(value = "id of the tag to return",required=true) @PathParam("itemId") String itemId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getTag(itemId,securityContext);
    }
    @PUT
    @Path("/{itemId}")
    
    
    @io.swagger.annotations.ApiOperation(value = "update tag", notes = "update an existing tag", response = Tag.class, tags={ "tag","opc", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Tag successfuly updated", response = Tag.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid ID supplied", response = Void.class),
        
        @io.swagger.annotations.ApiResponse(code = 404, message = "Tag resource not found", response = Void.class) })
    public Response updateTag(@ApiParam(value = "itemId to be updated",required=true) @PathParam("itemId") String itemId
,@ApiParam(value = "new Tag definition" ,required=true) Tag tag
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.updateTag(itemId,tag,securityContext);
    }
}
