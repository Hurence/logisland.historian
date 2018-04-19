package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.Datasource;
import com.hurence.logisland.historian.rest.v1.model.Error;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.service.DatasourcesApiService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;
import javax.validation.Valid;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-18T15:00:18.181+02:00")

@Controller
public class DatasourcesApiController implements DatasourcesApi {

    private static final Logger log = LoggerFactory.getLogger(DatasourcesApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    private final DatasourcesApiService service;


    @org.springframework.beans.factory.annotation.Autowired
    public DatasourcesApiController(ObjectMapper objectMapper, HttpServletRequest request, DatasourcesApiService service) {
        this.objectMapper = objectMapper;
        this.request = request;
        this.service = service;
    }

    public ResponseEntity<Datasource> addDatasourceWithId(@ApiParam(value = "Datasource resource to add" ,required=true )  @Valid @RequestBody Datasource body,@ApiParam(value = "datasourceId to",required=true) @PathVariable("datasourceId") String datasourceId) {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<Datasource>(
                objectMapper.readValue("{  \"clsid\" : \"clsid\",  \"password\" : \"password\",  \"domain\" : \"domain\",  \"host\" : \"host\",  \"description\" : \"description\",  \"id\" : \"id\",  \"user\" : \"user\"}", Datasource.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<Datasource>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<Datasource>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Datasource> deleteDatasource(@ApiParam(value = "id of the Datasource to be deleted",required=true) @PathVariable("datasourceId") String datasourceId) {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<Datasource>(
                objectMapper.readValue("{  \"clsid\" : \"clsid\",  \"password\" : \"password\",  \"domain\" : \"domain\",  \"host\" : \"host\",  \"description\" : \"description\",  \"id\" : \"id\",  \"user\" : \"user\"}", Datasource.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<Datasource>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<Datasource>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<List<Datasource>> getAllDatasources() {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<List<Datasource>>(
                objectMapper.readValue("[ {  \"clsid\" : \"clsid\",  \"password\" : \"password\",  \"domain\" : \"domain\",  \"host\" : \"host\",  \"description\" : \"description\",  \"id\" : \"id\",  \"user\" : \"user\"}, {  \"clsid\" : \"clsid\",  \"password\" : \"password\",  \"domain\" : \"domain\",  \"host\" : \"host\",  \"description\" : \"description\",  \"id\" : \"id\",  \"user\" : \"user\"} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<List<Datasource>>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<List<Datasource>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<List<Tag>> getAllDatasourcesTags() {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<List<Tag>>(
                objectMapper.readValue("[ {  \"server\" : \"server\",  \"last_polling_date\" : 1,  \"tag_name\" : \"tag_name\",  \"update_rate\" : 5,  \"min_numeric_value\" : 5.63737665663332876420099637471139430999755859375,  \"description\" : \"description\",  \"creation_date\" : 0,  \"last_quality\" : 9,  \"labels\" : [ \"labels\", \"labels\" ],  \"last_numeric_value\" : 7.061401241503109,  \"domain\" : \"domain\",  \"data_type\" : \"float\",  \"last_modification_date\" : 6,  \"max_numeric_value\" : 2.3021358869347655,  \"id\" : \"mySweetUniqueId\",  \"text\" : [ \"text\", \"text\" ],  \"group\" : \"group\"}, {  \"server\" : \"server\",  \"last_polling_date\" : 1,  \"tag_name\" : \"tag_name\",  \"update_rate\" : 5,  \"min_numeric_value\" : 5.63737665663332876420099637471139430999755859375,  \"description\" : \"description\",  \"creation_date\" : 0,  \"last_quality\" : 9,  \"labels\" : [ \"labels\", \"labels\" ],  \"last_numeric_value\" : 7.061401241503109,  \"domain\" : \"domain\",  \"data_type\" : \"float\",  \"last_modification_date\" : 6,  \"max_numeric_value\" : 2.3021358869347655,  \"id\" : \"mySweetUniqueId\",  \"text\" : [ \"text\", \"text\" ],  \"group\" : \"group\"} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<List<Tag>>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<List<Tag>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Datasource> getDatasource(@ApiParam(value = "id of the Datasource to return",required=true) @PathVariable("datasourceId") String datasourceId) {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<Datasource>(
                objectMapper.readValue("{  \"clsid\" : \"clsid\",  \"password\" : \"password\",  \"domain\" : \"domain\",  \"host\" : \"host\",  \"description\" : \"description\",  \"id\" : \"id\",  \"user\" : \"user\"}", Datasource.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<Datasource>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<Datasource>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Datasource> updateDatasource(@ApiParam(value = "datasourceId to be updated",required=true) @PathVariable("datasourceId") String datasourceId,@ApiParam(value = "new Datasource definition" ,required=true )  @Valid @RequestBody Datasource datasource) {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<Datasource>(
                objectMapper.readValue("{  \"clsid\" : \"clsid\",  \"password\" : \"password\",  \"domain\" : \"domain\",  \"host\" : \"host\",  \"description\" : \"description\",  \"id\" : \"id\",  \"user\" : \"user\"}", Datasource.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<Datasource>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<Datasource>(HttpStatus.NOT_IMPLEMENTED);
    }

}
