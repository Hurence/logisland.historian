/**
* NOTE: This class is auto generated by the swagger code generator program (2.3.1).
* https://github.com/swagger-api/swagger-codegen
* Do not edit the class manually.
*/
package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.Alert;
import com.hurence.logisland.historian.rest.v1.model.Error;
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

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-07-13T12:16:03.361+02:00")

@Api(value = "alerts", description = "the alerts API")
    public interface AlertsApi {

            @ApiOperation(value = "get all alerts", nickname = "getAlerts", notes = "get the alerts", response = Alert.class, responseContainer = "List", tags={ "alerts", })
            @ApiResponses(value = { 
                @ApiResponse(code = 200, message = "job metrics", response = Alert.class, responseContainer = "List"),
                @ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
            @RequestMapping(value = "/api/v1/alerts",
            method = RequestMethod.GET)
        ResponseEntity<List<Alert>> getAlerts(@ApiParam(value = "max number of ites to retrieve", defaultValue = "20") @Valid @RequestParam(value = "count", required = false, defaultValue="20") Integer count,@ApiParam(value = "severity level (the higher the most severe)", defaultValue = "0") @Valid @RequestParam(value = "severity", required = false, defaultValue="0") Integer severity,@ApiParam(value = "lower date range", defaultValue = "1DAYS-AGO") @Valid @RequestParam(value = "start", required = false, defaultValue="1DAYS-AGO") String start,@ApiParam(value = "upper date range", defaultValue = "NOW") @Valid @RequestParam(value = "end", required = false, defaultValue="NOW") String end);

        }
