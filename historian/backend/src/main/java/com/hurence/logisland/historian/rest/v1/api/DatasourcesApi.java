/**
* NOTE: This class is auto generated by the swagger code generator program (2.3.1).
* https://github.com/swagger-api/swagger-codegen
* Do not edit the class manually.
*/
package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.Datasource;
import com.hurence.logisland.historian.rest.v1.model.Error;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-07-18T17:02:10.968+02:00")

@Api(value = "datasources", description = "the datasources API")
    public interface DatasourcesApi {

            @ApiOperation(value = "create new Datasource", nickname = "addDatasourceWithId", notes = "store a new Datasource", response = Datasource.class, tags={ "datasource", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Datasource successfuly created", response = Datasource.class),
                @ApiResponse(code = 400, message = "Invalid ID supplied"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/datasources/{datasourceId}",
            method = RequestMethod.POST)
        ResponseEntity<Datasource> addDatasourceWithId(@ApiParam(value = "Datasource resource to add" ,required=true )  @Valid @RequestBody Datasource body,@ApiParam(value = "datasourceId to",required=true) @PathVariable("datasourceId") String datasourceId);


            @ApiOperation(value = "delete Datasource", nickname = "deleteDatasource", notes = "remove the corresponding Datasource", response = Datasource.class, tags={ "datasource", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Datasource successfully removed", response = Datasource.class),
                @ApiResponse(code = 400, message = "Invalid ID supplied"),
                @ApiResponse(code = 404, message = "Datasource resource not found"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/datasources/{datasourceId}",
            method = RequestMethod.DELETE)
        ResponseEntity<Datasource> deleteDatasource(@ApiParam(value = "id of the Datasource to be deleted",required=true) @PathVariable("datasourceId") String datasourceId);


            @ApiOperation(value = "get all datasources", nickname = "getAllDatasources", notes = "retrieve all datasources", response = Datasource.class, responseContainer = "List", tags={ "datasource", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Datasource list", response = Datasource.class, responseContainer = "List"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/datasources",
                produces = { "application/json" }, 
            method = RequestMethod.GET)
        ResponseEntity<List<Datasource>> getAllDatasources(@ApiParam(value = "filter query (lucene syntax like fq=\"labels:opc AND datasources:win32\")") @Valid @RequestParam(value = "fq", required = false) String fq);


            @ApiOperation(value = "get all tags from datasources", nickname = "getAllDatasourcesTags", notes = "retrieve all tags through this datasources", response = Tag.class, responseContainer = "List", tags={ "datasource", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Tag list", response = Tag.class, responseContainer = "List"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/datasources/tags",
                produces = { "application/json" }, 
            method = RequestMethod.GET)
        ResponseEntity<List<Tag>> getAllDatasourcesTags();


            @ApiOperation(value = "get all tags from a given datasource", nickname = "getAllTagsFromDatasource", notes = "retrieve all tags through this datasource", response = Tag.class, responseContainer = "List", tags={ "tag","datasource", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Tag list", response = Tag.class, responseContainer = "List"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/datasources/{datasourceId}/tags",
                produces = { "application/json" }, 
            method = RequestMethod.GET)
        ResponseEntity<List<Tag>> getAllTagsFromDatasource(@ApiParam(value = "id of the Datasource to return",required=true) @PathVariable("datasourceId") String datasourceId);


            @ApiOperation(value = "get Datasource", nickname = "getDatasource", notes = "get the corresponding Datasource", response = Datasource.class, tags={ "datasource", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Datasource found", response = Datasource.class),
                @ApiResponse(code = 404, message = "Datasource resource not found"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/datasources/{datasourceId}",
                produces = { "application/json" }, 
            method = RequestMethod.GET)
        ResponseEntity<Datasource> getDatasource(@ApiParam(value = "id of the Datasource to return",required=true) @PathVariable("datasourceId") String datasourceId);


            @ApiOperation(value = "update Datasource", nickname = "updateDatasource", notes = "update an existing Datasource", response = Datasource.class, tags={ "datasource", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Datasource successfuly updated", response = Datasource.class),
                @ApiResponse(code = 400, message = "Invalid ID supplied"),
                @ApiResponse(code = 404, message = "Datasource resource not found") })
            @RequestMapping(value = "/api/v1/datasources/{datasourceId}",
            method = RequestMethod.PUT)
        ResponseEntity<Datasource> updateDatasource(@ApiParam(value = "datasourceId to be updated",required=true) @PathVariable("datasourceId") String datasourceId,@ApiParam(value = "new Datasource definition" ,required=true )  @Valid @RequestBody Datasource datasource);

        }
