package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.Error;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.service.TagService;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

@Path("/tags")


@io.swagger.annotations.Api(description = "the tags API")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-16T16:36:23.971+02:00")
public class TagsApi {


    @Autowired
    TagService tagService;

    @POST
    @Path("/{itemId}")


    @io.swagger.annotations.ApiOperation(value = "create new tag", notes = "store a new tag", response = Tag.class, tags = {"tag",})
    @io.swagger.annotations.ApiResponses(value = {
            @io.swagger.annotations.ApiResponse(code = 200, message = "Tag successfuly created", response = Tag.class),

            @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid ID supplied", response = Void.class),

            @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class)})
    public Response addTagWithId(@ApiParam(value = "Tag resource to add", required = true) Tag body
            , @ApiParam(value = "itemId to", required = true) @PathParam("itemId") String itemId
            , @Context SecurityContext securityContext)
            throws NotFoundException {


        return tagService.addTagWithId(body, itemId, securityContext);
    }

    @DELETE
    @Path("/{itemId}")


    @io.swagger.annotations.ApiOperation(value = "delete tag", notes = "remove the corresponding Tag", response = Tag.class, tags = {"tag",})
    @io.swagger.annotations.ApiResponses(value = {
            @io.swagger.annotations.ApiResponse(code = 200, message = "Tag successfully removed", response = Tag.class),

            @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid ID supplied", response = Void.class),

            @io.swagger.annotations.ApiResponse(code = 404, message = "Tag resource not found", response = Void.class),

            @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class)})
    public Response deleteTag(@ApiParam(value = "id of the tag to be deleted", required = true) @PathParam("itemId") String itemId
            , @Context SecurityContext securityContext)
            throws NotFoundException {
        return tagService.deleteTag(itemId, securityContext);
    }

    @GET


    @Produces({"application/json"})
    @io.swagger.annotations.ApiOperation(value = "get all saved tags", notes = "retrieve all OPC tags", response = Tag.class, responseContainer = "List", tags = {"tag", "opc",})
    @io.swagger.annotations.ApiResponses(value = {
            @io.swagger.annotations.ApiResponse(code = 200, message = "tags list", response = Tag.class, responseContainer = "List"),

            @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class)})
    public Response getAllTags(@ApiParam(value = "filter query (lucene syntax like fq=\"labels:opc AND datasources:win32\")") @QueryParam("fq") String fq
            , @Context SecurityContext securityContext)
            throws NotFoundException {
        return tagService.getAllTags(fq, securityContext);
    }

    @GET
    @Path("/{itemId}")

    @Produces({"application/json"})
    @io.swagger.annotations.ApiOperation(value = "get tag", notes = "get the corresponding Tag", response = Tag.class, tags = {"tag",})
    @io.swagger.annotations.ApiResponses(value = {
            @io.swagger.annotations.ApiResponse(code = 200, message = "tag", response = Tag.class),

            @io.swagger.annotations.ApiResponse(code = 404, message = "Tag resource not found", response = Void.class),

            @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class)})
    public Response getTag(@ApiParam(value = "id of the tag to return", required = true) @PathParam("itemId") String itemId
            , @Context SecurityContext securityContext)
            throws NotFoundException {
        return tagService.getTag(itemId, securityContext);
    }

    @PUT
    @Path("/{itemId}")


    @io.swagger.annotations.ApiOperation(value = "update tag", notes = "update an existing tag", response = Tag.class, tags = {"tag", "opc",})
    @io.swagger.annotations.ApiResponses(value = {
            @io.swagger.annotations.ApiResponse(code = 200, message = "Tag successfuly updated", response = Tag.class),

            @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid ID supplied", response = Void.class),

            @io.swagger.annotations.ApiResponse(code = 404, message = "Tag resource not found", response = Void.class)})
    public Response updateTag(@ApiParam(value = "itemId to be updated", required = true) @PathParam("itemId") String itemId
            , @ApiParam(value = "new Tag definition", required = true) Tag tag
            , @Context SecurityContext securityContext)
            throws NotFoundException {
        return tagService.updateTag(itemId, tag, securityContext);
    }
}
