package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.DataFlow;
import com.hurence.logisland.historian.rest.v1.model.Datasource;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.service.DataflowsApiService;
import com.hurence.logisland.historian.service.DatasourcesApiService;
import com.hurence.logisland.historian.service.OpcService;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-18T15:00:18.181+02:00")

@Controller
public class DataflowsApiController implements DataflowsApi {

    private static final Logger log = LoggerFactory.getLogger(DataflowsApiController.class);

    private final DataflowsApiService service;


    @org.springframework.beans.factory.annotation.Autowired
    public DataflowsApiController(DataflowsApiService service,
                                  OpcService opcService) {

        this.service = service;
    }


    @Override
    public ResponseEntity<Void> notifyDataflowConfiguration(
            @ApiParam(value = "the dataflow name (aka the logisland job name)",required=true) @PathVariable("dataflowName") String dataflowName,
            @ApiParam(value = "logisland job id (aka the engine name)",required=true) @PathVariable("jobId") String jobId,
            @ApiParam(value = "" ,required=true )  @Valid @RequestBody DataFlow dataflow) {
        return null;
    }

    @Override
    public ResponseEntity<DataFlow> pollDataflowConfiguration(
            @ApiParam(value = "the dataflow name (aka the logisland job name)",required=true) @PathVariable("dataflowName") String dataflowName,
            @ApiParam(value = "Timestamp of last response" ) @RequestHeader(value="If-Modified-Since", required=false) String ifModifiedSinceString) {
        Optional<DataFlow> dataflow = service.getDataflow(dataflowName);
        if (dataflow.isPresent()) {
            return new ResponseEntity<DataFlow>(dataflow.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<DataFlow>(HttpStatus.NOT_FOUND);

        }
    }
}
