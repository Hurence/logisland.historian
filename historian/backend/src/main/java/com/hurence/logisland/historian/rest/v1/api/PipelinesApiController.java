package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.Error;
import com.hurence.logisland.historian.rest.v1.model.Pipeline;
import com.hurence.logisland.historian.service.PipelinesApiService;
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
public class PipelinesApiController implements PipelinesApi {

    private static final Logger log = LoggerFactory.getLogger(PipelinesApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    private final PipelinesApiService service;


    @org.springframework.beans.factory.annotation.Autowired
    public PipelinesApiController(ObjectMapper objectMapper, HttpServletRequest request, PipelinesApiService service) {
        this.objectMapper = objectMapper;
        this.request = request;
        this.service = service;
    }

    public ResponseEntity<Pipeline> addPipelineWithId(@ApiParam(value = "Pipeline configuration to add to the store" ,required=true )  @Valid @RequestBody Pipeline body,@ApiParam(value = "PipelineId to add to the store",required=true) @PathVariable("pipelineId") String pipelineId) {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<Pipeline>(
                objectMapper.readValue("{  \"component\" : \"component\",  \"documentation\" : \"documentation\",  \"name\" : \"name\",  \"processors\" : [ {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  }, {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  } ],  \"config\" : [ {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  }, {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  } ]}", Pipeline.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<Pipeline>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<Pipeline>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Pipeline> deletePipeline(@ApiParam(value = "id of the pipeline to return",required=true) @PathVariable("pipelineId") String pipelineId) {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<Pipeline>(
                objectMapper.readValue("{  \"component\" : \"component\",  \"documentation\" : \"documentation\",  \"name\" : \"name\",  \"processors\" : [ {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  }, {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  } ],  \"config\" : [ {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  }, {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  } ]}", Pipeline.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<Pipeline>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<Pipeline>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<List<Pipeline>> getAllPipelines() {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<List<Pipeline>>(
                objectMapper.readValue("[ {  \"component\" : \"component\",  \"documentation\" : \"documentation\",  \"name\" : \"name\",  \"processors\" : [ {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  }, {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  } ],  \"config\" : [ {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  }, {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  } ]}, {  \"component\" : \"component\",  \"documentation\" : \"documentation\",  \"name\" : \"name\",  \"processors\" : [ {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  }, {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  } ],  \"config\" : [ {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  }, {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  } ]} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<List<Pipeline>>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<List<Pipeline>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Pipeline> getPipeline(@ApiParam(value = "id of the pipeline to return",required=true) @PathVariable("pipelineId") String pipelineId) {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<Pipeline>(
                objectMapper.readValue("{  \"component\" : \"component\",  \"documentation\" : \"documentation\",  \"name\" : \"name\",  \"processors\" : [ {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  }, {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  } ],  \"config\" : [ {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  }, {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  } ]}", Pipeline.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<Pipeline>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<Pipeline>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Pipeline> startPipeline(@ApiParam(value = "id of the pipeline to return",required=true) @PathVariable("pipelineId") String pipelineId) {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<Pipeline>(
                objectMapper.readValue("{  \"component\" : \"component\",  \"documentation\" : \"documentation\",  \"name\" : \"name\",  \"processors\" : [ {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  }, {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  } ],  \"config\" : [ {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  }, {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  } ]}", Pipeline.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<Pipeline>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<Pipeline>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Pipeline> updatePipeline(@ApiParam(value = "Pipeline to add to the store",required=true) @PathVariable("pipelineId") String pipelineId,@ApiParam(value = "Pipeline to add to the store" ,required=true )  @Valid @RequestBody Pipeline pipeline) {
            String accept = request.getHeader("Accept");
            if (accept != null && accept.contains("application/json")) {
                try {
                    return new ResponseEntity<Pipeline>(
                objectMapper.readValue("{  \"component\" : \"component\",  \"documentation\" : \"documentation\",  \"name\" : \"name\",  \"processors\" : [ {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  }, {    \"component\" : \"component\",    \"documentation\" : \"documentation\",    \"name\" : \"name\",    \"config\" : [ {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    }, {      \"type\" : \"string\",      \"value\" : \"value\",      \"key\" : \"key\"    } ]  } ],  \"config\" : [ {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  }, {    \"type\" : \"string\",    \"value\" : \"value\",    \"key\" : \"key\"  } ]}", Pipeline.class), HttpStatus.NOT_IMPLEMENTED);
                    } catch (IOException e) {
                    log.error("Couldn't serialize response for content type application/json", e);
                    return new ResponseEntity<Pipeline>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<Pipeline>(HttpStatus.NOT_IMPLEMENTED);
    }

}
