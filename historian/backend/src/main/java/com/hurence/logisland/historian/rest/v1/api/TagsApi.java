/**
* NOTE: This class is auto generated by the swagger code generator program (2.3.1).
* https://github.com/swagger-api/swagger-codegen
* Do not edit the class manually.
*/
package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.BulkLoad;
import com.hurence.logisland.historian.rest.v1.model.Error;
import com.hurence.logisland.historian.rest.v1.model.Header;
import com.hurence.logisland.historian.rest.v1.model.ImportTagReport;
import java.util.List;
import com.hurence.logisland.historian.rest.v1.model.Measures;
import com.hurence.logisland.historian.rest.v1.model.MeasuresRequest;
import org.springframework.core.io.Resource;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.rest.v1.model.TreeNode;
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

@Api(value = "tags", description = "the tags API")
    public interface TagsApi {

            @ApiOperation(value = "create or update many tags", nickname = "addManyTags", notes = "create or update the given tags", response = Tag.class, responseContainer = "List", tags={ "tag", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Ok.", response = Tag.class, responseContainer = "List"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags/batch",
                produces = { "application/json" }, 
            method = RequestMethod.POST)
        ResponseEntity<List<Tag>> addManyTags(@ApiParam(value = "tags to create or update." ,required=true )  @Valid @RequestBody List<Tag> tags);


            @ApiOperation(value = "create or replace a tag", nickname = "createOrReplaceATag", notes = "create or replace a tag", response = Tag.class, tags={ "tag", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Tag successfuly replaced", response = Tag.class),
                @ApiResponse(code = 201, message = "Tag successfuly created", response = Tag.class),
                @ApiResponse(code = 400, message = "Invalid ID supplied") })
            @RequestMapping(value = "/api/v1/tags/{tagId}",
            method = RequestMethod.PUT)
        ResponseEntity<Tag> createOrReplaceATag(@ApiParam(value = "tagId to be created/replaced",required=true) @PathVariable("tagId") String tagId,@ApiParam(value = "Tag definition" ,required=true )  @Valid @RequestBody Tag tag);


            @ApiOperation(value = "delete tags", nickname = "deleteManyTags", notes = "delete the corresponding tags", response = Tag.class, responseContainer = "List", tags={ "tag", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Tags successfully removed or not found.", response = Tag.class, responseContainer = "List"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags/batch",
                produces = { "application/json" }, 
            method = RequestMethod.DELETE)
        ResponseEntity<List<Tag>> deleteManyTags(@ApiParam(value = "id of the tags to be deleted." ,required=true )  @Valid @RequestBody List<String> tagIds);


            @ApiOperation(value = "delete tag", nickname = "deleteTag", notes = "remove the corresponding Tag", response = Tag.class, tags={ "tag", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Tag successfully removed", response = Tag.class),
                @ApiResponse(code = 400, message = "Invalid ID supplied"),
                @ApiResponse(code = 404, message = "Tag resource not found"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags/{tagId}",
            method = RequestMethod.DELETE)
        ResponseEntity<Tag> deleteTag(@ApiParam(value = "id of the tag to be deleted",required=true) @PathVariable("tagId") String tagId);


            @ApiOperation(value = "get all saved tags", nickname = "getAllTags", notes = "retrieve all OPC tags", response = Tag.class, responseContainer = "List", tags={ "tag", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "tags list", response = Tag.class, responseContainer = "List"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags",
                produces = { "application/json" }, 
            method = RequestMethod.GET)
        ResponseEntity<List<Tag>> getAllTags(@ApiParam(value = "filter query (lucene syntax like fq=\"labels:opc AND datasources:win32\")") @Valid @RequestParam(value = "fq", required = false) String fq,@ApiParam(value = "max number of elements to return") @Valid @RequestParam(value = "limit", required = false) Integer limit,@ApiParam(value = "sort query <field name>+<direction>[,<field name>+<direction>] (syntax like sort=last_modification_date desc )") @Valid @RequestParam(value = "sort", required = false) String sort);


            @ApiOperation(value = "get tag", nickname = "getTag", notes = "get the corresponding Tag", response = Tag.class, tags={ "tag", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "tag", response = Tag.class),
                @ApiResponse(code = 404, message = "Tag resource not found"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags/{tagId}",
                produces = { "application/json" }, 
            method = RequestMethod.GET)
        ResponseEntity<Tag> getTag(@ApiParam(value = "id of the tag to return",required=true) @PathVariable("tagId") String tagId);


            @ApiOperation(value = "get tag measures", nickname = "getTagMeasures", notes = "get the corresponding Tag measures between start and end time", response = Measures.class, tags={ "tag","measure", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "tag", response = Measures.class),
                @ApiResponse(code = 404, message = "Tag resource not found"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags/{tagId}/measures",
                produces = { "application/json" }, 
            method = RequestMethod.GET)
        ResponseEntity<Measures> getTagMeasures(@ApiParam(value = "id of the tag",required=true) @PathVariable("tagId") String tagId,@ApiParam(value = "date de début (borne inf) peut-être exprimée sous les formats suivants :   timestamp : 4578965   date-time : 2015-11-25T12:06:57.330Z   relatif   : NOW-30DAYS ") @Valid @RequestParam(value = "start", required = false) String start,@ApiParam(value = "date de fin (borne sup) peut-être exprimée sous les formats suivants :   timestamp : 4578965   date-time : 2015-11-25T12:06:57.330Z   relatif   : NOW-30DAYS ") @Valid @RequestParam(value = "end", required = false) String end,@ApiParam(value = "Multiple analyses, aggregations, and transformations are allowed per query. If so, Chronix will first execute the transformations in the order they occur. Then it executes the analyses and aggregations on the result of the chained transformations. For example the query:    max;min;trend;movavg:10,minutes;scale:4  is executed as follows:    Calculate the moving average   Scale the result of the moving average by 4   Calculate the max, min, and the trend based on the prior result. ") @Valid @RequestParam(value = "functions", required = false) String functions,@ApiParam(value = "will retrieve only function values, no data points", defaultValue = "false") @Valid @RequestParam(value = "no_values", required = false, defaultValue="false") Boolean noValues);


            @ApiOperation(value = "get specified tag measures", nickname = "getTagMeasures", notes = "get specified tag measures", response = Measures.class, responseContainer = "List", tags={ "tag","measure", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Measures", response = Measures.class, responseContainer = "List"),
                @ApiResponse(code = 404, message = "Tag resource not found"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags/measures/getmany",
                produces = { "application/json" }, 
            method = RequestMethod.POST)
        ResponseEntity<List<Measures>> getTagMeasures(@ApiParam(value = "requests for measures to retrieve" ,required=true )  @Valid @RequestBody List<MeasuresRequest> requests);


            @ApiOperation(value = "get tag measures stats", nickname = "getTagStats", notes = "get the corresponding Tag mesures for last chunk", response = Measures.class, tags={ "tag","measure", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "tag", response = Measures.class),
                @ApiResponse(code = 404, message = "Tag resource not found"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags/{tagId}/stats",
                produces = { "application/json" }, 
            method = RequestMethod.GET)
        ResponseEntity<Measures> getTagStats(@ApiParam(value = "id of the tag",required=true) @PathVariable("tagId") String tagId);


            @ApiOperation(value = "return expected headers in csv file for POST request", nickname = "getTagsCsvHeaders", notes = "return expected headers in csv file for POST request", response = Header.class, responseContainer = "List", tags={ "tag","import", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "list of expected headers (required or not)", response = Header.class, responseContainer = "List"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags/importcsv",
                produces = { "application/json" }, 
            method = RequestMethod.GET)
        ResponseEntity<List<Header>> getTagsCsvHeaders();


            @ApiOperation(value = "get tag tree by fields", nickname = "getTreeTag", notes = "get tag tree by fields for each value of chosen fields", response = TreeNode.class, responseContainer = "List", tags={ "tag", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "Tree of tag fields", response = TreeNode.class, responseContainer = "List"),
                @ApiResponse(code = 404, message = "Tree of tag could not be build"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags/tree",
                produces = { "application/json" }, 
            method = RequestMethod.GET)
        ResponseEntity<List<TreeNode>> getTreeTag(@ApiParam(value = "maximum number of element to retrieve in a treenode.", defaultValue = "100") @Valid @RequestParam(value = "limit", required = false, defaultValue="100") Integer limit);


            @ApiOperation(value = "import definition of tags in csv format", nickname = "importTagsFromCsv", notes = "import definition of tags in csv format", response = ImportTagReport.class, tags={ "tag","import", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "import succeeded", response = ImportTagReport.class),
                @ApiResponse(code = 422, message = "csv file not containing required headers.", response = Header.class, responseContainer = "List"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags/importcsv",
                produces = { "application/json" }, 
            method = RequestMethod.POST)
        ResponseEntity<ImportTagReport> importTagsFromCsv(@ApiParam(value = "file detail") @Valid @RequestPart("file") MultipartFile file,@ApiParam(value = "the csv file separator", defaultValue = ";") @Valid @RequestParam(value = "separator", required = false, defaultValue=";") String separator,@ApiParam(value = "the csv file charset encoding", defaultValue = "UTF-8") @Valid @RequestParam(value = "charset", required = false, defaultValue="UTF-8") String charset,@ApiParam(value = "the number of line to inject at the same time", defaultValue = "10000") @Valid @RequestParam(value = "bulkSize", required = false, defaultValue="10000") Integer bulkSize);


            @ApiOperation(value = "post tag measures", nickname = "postTagMeasures", notes = "post some new values", response = BulkLoad.class, tags={ "tag","measure", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "BulkLoad result", response = BulkLoad.class),
                @ApiResponse(code = 404, message = "Tag resource not found"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags/measures",
                produces = { "application/json" }, 
            method = RequestMethod.POST)
        ResponseEntity<BulkLoad> postTagMeasures(@ApiParam(value = "file detail") @Valid @RequestPart("file") MultipartFile content,@ApiParam(value = "the csv file content", defaultValue = ";") @Valid @RequestParam(value = "csv_delimiter", required = false, defaultValue=";") String csvDelimiter,@ApiParam(value = "valid values LONG (ms since 1970),   INSTANT (default java 8 instant),   'SDF-FORMAT' e.g dd.MM.yyyy HH:mm:ss.SSS ", defaultValue = "dd.MM.yyyy HH:mm:ss.SSS") @Valid @RequestParam(value = "date_format", required = false, defaultValue="dd.MM.yyyy HH:mm:ss.SSS") String dateFormat,@ApiParam(value = "valid values ENGLISH, GERMAN", defaultValue = "ENGLISH") @Valid @RequestParam(value = "number_format", required = false, defaultValue="ENGLISH") String numberFormat,@ApiParam(value = "") @Valid @RequestParam(value = "attribute_fields", required = false) String attributeFields,@ApiParam(value = "will discard all previously loaded data (use it with great care)", defaultValue = "false") @Valid @RequestParam(value = "clean_import", required = false, defaultValue="false") Boolean cleanImport,@ApiParam(value = "the number of points by chunk") @Valid @RequestParam(value = "points_by_chunk", required = false) Integer pointsByChunk);


            @ApiOperation(value = "post tag measures simulation", nickname = "postTagMeasuresGenerator", notes = "post some new values according to a simulation", response = BulkLoad.class, tags={ "tag","measure", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "BulkLoad result", response = BulkLoad.class),
                @ApiResponse(code = 404, message = "Tag resource not found"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/tags/measures/generator",
                produces = { "application/json" }, 
            method = RequestMethod.POST)
        ResponseEntity<BulkLoad> postTagMeasuresGenerator(@ApiParam(value = "file detail") @Valid @RequestPart("file") MultipartFile config,@ApiParam(value = "") @Valid @RequestParam(value = "attribute_fields", required = false) String attributeFields,@ApiParam(value = "will discard all previously loaded data (use it with great care)", defaultValue = "false") @Valid @RequestParam(value = "clean_import", required = false, defaultValue="false") Boolean cleanImport);

        }
