package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.config.bean.LogislandConfigurationBean;
import com.hurence.logisland.historian.rest.v1.model.DataFlow;
import com.hurence.logisland.historian.service.DataflowsApiService;
import com.hurence.logisland.historian.service.OpcService;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Date;
import java.util.Optional;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-18T15:00:18.181+02:00")

@Controller
public class DataflowsApiController implements DataflowsApi {

    private static final Logger log = LoggerFactory.getLogger(DataflowsApiController.class);

    private final DataflowsApiService service;

    private final LogislandConfigurationBean logislandConfigurationBean;


    @org.springframework.beans.factory.annotation.Autowired
    public DataflowsApiController(DataflowsApiService service,
                                  LogislandConfigurationBean logislandConfigurationBean) {

        this.service = service;
        this.logislandConfigurationBean = logislandConfigurationBean;
    }


    @Override
    public ResponseEntity<Void> notifyDataflowConfiguration(
            @ApiParam(value = "the dataflow name (aka the logisland job name)", required = true) @PathVariable("dataflowName") String dataflowName,
            @ApiParam(value = "", required = false) @RequestBody(required = false) DataFlow dataflow) {
        Optional<DataFlow> df = service.getDataflow(dataflowName);
        if (df.isPresent()) {
            //simple check...it may be improved
            service.updateLastPing(dataflowName, dataflow != null && dataflow.getStreams() != null && !dataflow.getStreams().isEmpty()
                    ? new Date() : null);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);

        }
    }

    @Override
    public ResponseEntity<DataFlow> pollDataflowConfiguration(
            @ApiParam(value = "the dataflow name (aka the logisland job name)", required = true) @PathVariable("dataflowName") String dataflowName,
            @ApiParam(value = "Timestamp of last response") @RequestHeader(value = "If-Modified-Since", required = false) String ifModifiedSinceString) {
        Optional<DataFlow> dataflow = service.getDataflow(dataflowName);
        if (dataflow.isPresent()) {
            return new ResponseEntity<DataFlow>(dataflow.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<DataFlow>(HttpStatus.NOT_FOUND);

        }
    }

    @Override
    public ResponseEntity<DataFlow> updateDataflowConfiguration(
            @ApiParam(value = "the dataflow name (aka the logisland job name)", required = true) @PathVariable("dataflowName") String dataflowName
    ) {
        if (dataflowName.equals(logislandConfigurationBean.getOpcDataflowName())) {
            service.updateOpcDataflow();
            Optional<DataFlow> dataflowO = service.getDataflow(dataflowName);
            if (dataflowO.isPresent()) {
                DataFlow df = dataflowO.get();
                return new ResponseEntity<DataFlow>(df, HttpStatus.OK);
            } else {
                return new ResponseEntity<DataFlow>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<DataFlow>(HttpStatus.NOT_FOUND);
        }
    }
}
