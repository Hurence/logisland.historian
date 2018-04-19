package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.Alert;
import com.hurence.logisland.historian.rest.v1.model.Error;
import com.hurence.logisland.historian.service.AlertsApiService;
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
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-18T10:27:56.333+02:00")

@Controller
public class AlertsApiController implements AlertsApi {

    private static final Logger log = LoggerFactory.getLogger(AlertsApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    private final AlertsApiService service;


    @org.springframework.beans.factory.annotation.Autowired
    public AlertsApiController(ObjectMapper objectMapper, HttpServletRequest request, AlertsApiService service) {
        this.objectMapper = objectMapper;
        this.request = request;
        this.service = service;
    }

    public ResponseEntity<List<Alert>> getAlerts(@ApiParam(value = "max number of ites to retrieve", defaultValue = "20") @Valid @RequestParam(value = "count", required = false, defaultValue="20") Integer count,@ApiParam(value = "severity level (the higher the most severe)", defaultValue = "0") @Valid @RequestParam(value = "severity", required = false, defaultValue="0") Integer severity,@ApiParam(value = "lower date range", defaultValue = "1DAYS-AGO") @Valid @RequestParam(value = "start", required = false, defaultValue="1DAYS-AGO") String start,@ApiParam(value = "upper date range", defaultValue = "NOW") @Valid @RequestParam(value = "end", required = false, defaultValue="NOW") String end) {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<List<Alert>>(
                objectMapper.readValue("[ {  \"severity\" : 0,  \"time\" : \"time\",  \"tag\" : {    \"server\" : \"server\",    \"last_polling_date\" : 1,    \"tag_name\" : \"tag_name\",    \"update_rate\" : 5,    \"min_numeric_value\" : 5.63737665663332876420099637471139430999755859375,    \"description\" : \"description\",    \"creation_date\" : 0,    \"last_quality\" : 9,    \"labels\" : [ \"labels\", \"labels\" ],    \"last_numeric_value\" : 7.061401241503109,    \"domain\" : \"domain\",    \"data_type\" : \"float\",    \"last_modification_date\" : 6,    \"max_numeric_value\" : 2.3021358869347655,    \"id\" : \"mySweetUniqueId\",    \"text\" : [ \"text\", \"text\" ],    \"group\" : \"group\"  },  \"message\" : \"message\"}, {  \"severity\" : 0,  \"time\" : \"time\",  \"tag\" : {    \"server\" : \"server\",    \"last_polling_date\" : 1,    \"tag_name\" : \"tag_name\",    \"update_rate\" : 5,    \"min_numeric_value\" : 5.63737665663332876420099637471139430999755859375,    \"description\" : \"description\",    \"creation_date\" : 0,    \"last_quality\" : 9,    \"labels\" : [ \"labels\", \"labels\" ],    \"last_numeric_value\" : 7.061401241503109,    \"domain\" : \"domain\",    \"data_type\" : \"float\",    \"last_modification_date\" : 6,    \"max_numeric_value\" : 2.3021358869347655,    \"id\" : \"mySweetUniqueId\",    \"text\" : [ \"text\", \"text\" ],    \"group\" : \"group\"  },  \"message\" : \"message\"} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<List<Alert>>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<List<Alert>>(HttpStatus.NOT_IMPLEMENTED);
    }

}
