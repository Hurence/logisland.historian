package com.hurence.logisland.historian.rest.v1.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.service.TagsService;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-17T16:33:03.739+02:00")

@Controller
public class TagsApiController implements TagsApi {

    @Autowired
    TagsService tagsService;

    private static final Logger log = LoggerFactory.getLogger(TagsApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public TagsApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<Tag> addTagWithId(@ApiParam(value = "Tag resource to add", required = true) @Valid @RequestBody Tag body, @ApiParam(value = "itemId to", required = true) @PathVariable("itemId") String itemId) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<Tag>(objectMapper.readValue("{  \"server\" : \"server\",  \"last_polling_date\" : 1,  \"tag_name\" : \"tag_name\",  \"update_rate\" : 5,  \"min_numeric_value\" : 5.63737665663332876420099637471139430999755859375,  \"description\" : \"description\",  \"creation_date\" : 0,  \"last_quality\" : 9,  \"labels\" : [ \"labels\", \"labels\" ],  \"last_numeric_value\" : 7.061401241503109,  \"domain\" : \"domain\",  \"data_type\" : \"float\",  \"last_modification_date\" : 6,  \"max_numeric_value\" : 2.3021358869347655,  \"id\" : \"mySweetUniqueId\",  \"text\" : [ \"text\", \"text\" ],  \"last_base64_value\" : \"last_base64_value\",  \"group\" : \"group\"}", Tag.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<Tag>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<Tag>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Tag> deleteTag(@ApiParam(value = "id of the tag to be deleted", required = true) @PathVariable("itemId") String itemId) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<Tag>(objectMapper.readValue("{  \"server\" : \"server\",  \"last_polling_date\" : 1,  \"tag_name\" : \"tag_name\",  \"update_rate\" : 5,  \"min_numeric_value\" : 5.63737665663332876420099637471139430999755859375,  \"description\" : \"description\",  \"creation_date\" : 0,  \"last_quality\" : 9,  \"labels\" : [ \"labels\", \"labels\" ],  \"last_numeric_value\" : 7.061401241503109,  \"domain\" : \"domain\",  \"data_type\" : \"float\",  \"last_modification_date\" : 6,  \"max_numeric_value\" : 2.3021358869347655,  \"id\" : \"mySweetUniqueId\",  \"text\" : [ \"text\", \"text\" ],  \"last_base64_value\" : \"last_base64_value\",  \"group\" : \"group\"}", Tag.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<Tag>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<Tag>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<List<Tag>> getAllTags(@ApiParam(value = "filter query (lucene syntax like fq=\"labels:opc AND datasources:win32\")") @Valid @RequestParam(value = "fq", required = false) String fq) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {


                List<Tag> tags = tagsService.findAll();

                return new ResponseEntity<List<Tag>>((tags), HttpStatus.OK);
            } catch (Exception e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<List<Tag>>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<List<Tag>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Tag> getTag(@ApiParam(value = "id of the tag to return", required = true) @PathVariable("itemId") String itemId) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<Tag>(objectMapper.readValue("{  \"server\" : \"server\",  \"last_polling_date\" : 1,  \"tag_name\" : \"tag_name\",  \"update_rate\" : 5,  \"min_numeric_value\" : 5.63737665663332876420099637471139430999755859375,  \"description\" : \"description\",  \"creation_date\" : 0,  \"last_quality\" : 9,  \"labels\" : [ \"labels\", \"labels\" ],  \"last_numeric_value\" : 7.061401241503109,  \"domain\" : \"domain\",  \"data_type\" : \"float\",  \"last_modification_date\" : 6,  \"max_numeric_value\" : 2.3021358869347655,  \"id\" : \"mySweetUniqueId\",  \"text\" : [ \"text\", \"text\" ],  \"last_base64_value\" : \"last_base64_value\",  \"group\" : \"group\"}", Tag.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<Tag>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<Tag>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Tag> updateTag(@ApiParam(value = "itemId to be updated", required = true) @PathVariable("itemId") String itemId, @ApiParam(value = "new Tag definition", required = true) @Valid @RequestBody Tag tag) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<Tag>(objectMapper.readValue("{  \"server\" : \"server\",  \"last_polling_date\" : 1,  \"tag_name\" : \"tag_name\",  \"update_rate\" : 5,  \"min_numeric_value\" : 5.63737665663332876420099637471139430999755859375,  \"description\" : \"description\",  \"creation_date\" : 0,  \"last_quality\" : 9,  \"labels\" : [ \"labels\", \"labels\" ],  \"last_numeric_value\" : 7.061401241503109,  \"domain\" : \"domain\",  \"data_type\" : \"float\",  \"last_modification_date\" : 6,  \"max_numeric_value\" : 2.3021358869347655,  \"id\" : \"mySweetUniqueId\",  \"text\" : [ \"text\", \"text\" ],  \"last_base64_value\" : \"last_base64_value\",  \"group\" : \"group\"}", Tag.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<Tag>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<Tag>(HttpStatus.NOT_IMPLEMENTED);
    }

}
