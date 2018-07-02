package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.BulkLoad;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.service.AdminApiService;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-18T15:00:18.181+02:00")

@Controller
public class AdminApiController implements AdminApi {

    private static final Logger log = LoggerFactory.getLogger(AdminApiController.class);
    private final AdminApiService service;

    public AdminApiController(AdminApiService service) {
        this.service = service;
    }

    public ResponseEntity<List<Tag>> sampleData(
            @ApiParam(value = "do we flush previous entries ?", defaultValue = "false") @Valid @RequestParam(value = "flush", required = false, defaultValue = "false") Boolean flush,
            @Valid @RequestParam(value = "clean", required = false, defaultValue="false") Boolean clean) {
        if (clean) service.deleteAllTag();
        service.generateSampleDatasources(flush);
        return new ResponseEntity<List<Tag>>(service.generateSampleTags(flush), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BulkLoad> generateMeasuresForTags(@Valid @RequestPart("file") MultipartFile generator,
                                           @Valid @RequestParam(value = "clean", required = false, defaultValue="false") Boolean clean) {
        List<String> tagIds = service.getAllTagIds();
        return new ResponseEntity<BulkLoad>(service.launchTagMeasuresGenerator(generator, tagIds, clean), HttpStatus.OK);
    }

}
