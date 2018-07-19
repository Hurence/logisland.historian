package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.Datasource;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.rest.v1.model.operation_report.ReplaceReport;
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
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-18T15:00:18.181+02:00")

@Controller
public class DatasourcesApiController implements DatasourcesApi {

    private static final Logger log = LoggerFactory.getLogger(DatasourcesApiController.class);

    private final DatasourcesApiService service;

    private final OpcService opcService;


    @org.springframework.beans.factory.annotation.Autowired
    public DatasourcesApiController(DatasourcesApiService service,
                                    OpcService opcService) {

        this.service = service;
        this.opcService = opcService;
    }

    @Override
    public ResponseEntity<Datasource> createOrReplaceADatasource(
            @ApiParam(value = "datasourceId to be added/replaced",required=true) @PathVariable("datasourceId") String datasourceId,
            @ApiParam(value = "Datasource definition" ,required=true )  @Valid @RequestBody Datasource datasource) {
        ReplaceReport<Datasource> report = service.createOrReplaceADatasource(datasource, datasourceId);
        if (report.getItem().isPresent()) {
            if (report.isCreated()) {
                return new ResponseEntity<Datasource>(report.getItem().get(), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<Datasource>(report.getItem().get(), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<Datasource>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Datasource> deleteDatasource(@ApiParam(value = "id of the Datasource to be deleted", required = true) @PathVariable("datasourceId") String datasourceId) {

        Optional<Datasource> Datasource = service.deleteDatasource(datasourceId);
        if (Datasource.isPresent()) {
            return new ResponseEntity<Datasource>(Datasource.get(), HttpStatus.OK);

        } else {
            return new ResponseEntity<Datasource>(HttpStatus.NOT_FOUND);

        }
    }

    public ResponseEntity<List<Datasource>> getAllDatasources(@ApiParam(value = "filter query (lucene syntax like fq=\"labels:opc AND datasources:win32\")") @Valid @RequestParam(value = "fq", required = false) String fq) {
        return new ResponseEntity<List<Datasource>>(service.getAllDatasources(fq), HttpStatus.OK);
    }

    public ResponseEntity<List<Tag>> getAllDatasourcesTags() {
        return ResponseEntity.ok(opcService.browseAllTags());
    }

    public ResponseEntity<List<Tag>> getAllTagsFromDatasource(@ApiParam(value = "id of the Datasource to return",required=true) @PathVariable("datasourceId") String datasourceId){

        return ResponseEntity.ok(opcService.browseDatasourceTag(datasourceId));
    }

    public ResponseEntity<Datasource> getDatasource(@ApiParam(value = "id of the Datasource to return", required = true) @PathVariable("datasourceId") String datasourceId) {
        Optional<Datasource> Datasource = service.getDatasource(datasourceId);
        if (Datasource.isPresent()) {
            return new ResponseEntity<Datasource>(Datasource.get(), HttpStatus.OK);

        } else {
            return new ResponseEntity<Datasource>(HttpStatus.NOT_FOUND);

        }
    }


}
