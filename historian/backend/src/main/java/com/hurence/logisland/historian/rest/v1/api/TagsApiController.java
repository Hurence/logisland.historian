package com.hurence.logisland.historian.rest.v1.api;


import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.hurence.logisland.historian.rest.v1.model.*;
import com.hurence.logisland.historian.rest.v1.model.operation_report.ReplaceReport;
import com.hurence.logisland.historian.service.MeasuresApiService;
import com.hurence.logisland.historian.service.TagsApiService;
import com.hurence.logisland.historian.service.tag.TagImportCsv;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.lang.Error;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-18T14:55:12.030+02:00")

@Controller
public class TagsApiController implements TagsApi {

    private static final Logger log = LoggerFactory.getLogger(TagsApiController.class);

    private final TagsApiService service;
    private final MeasuresApiService measuresApiService;


    @org.springframework.beans.factory.annotation.Autowired
    public TagsApiController(TagsApiService service,
                             MeasuresApiService measuresApiService) {
        this.service = service;
        this.measuresApiService = measuresApiService;
    }

    @Override
    public ResponseEntity<List<Tag>> addManyTags(@ApiParam(value = "tags to create or update." ,required=true )  @Valid @RequestBody List<Tag> tags) {
        return new ResponseEntity<List<Tag>>(service.SaveOrUpdateMany(tags), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Tag> createOrReplaceATag(
            @ApiParam(value = "tagId to be updated",required=true) @PathVariable("tagId") String tagId,
            @ApiParam(value = "new Tag definition" ,required=true )  @Valid @RequestBody Tag tag) {
        ReplaceReport<Tag> report = service.createOrReplaceATag(tag, tagId);
        if (report.getItem().isPresent()) {
            if (report.isCreated()) {
                return new ResponseEntity<Tag>(report.getItem().get(), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<Tag>(report.getItem().get(), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<Tag>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<Tag>> deleteManyTags(@ApiParam(value = "id of the tags to be deleted." ,required=true )  @Valid @RequestBody List<String> tagIds) {
        return new ResponseEntity<List<Tag>>(service.deleteManyTag(tagIds), HttpStatus.OK);
    }

    public ResponseEntity<Tag> deleteTag(@ApiParam(value = "id of the tag to be deleted", required = true) @PathVariable("tagId") String tagId) {

        Optional<Tag> tag = service.deleteTag(tagId);
        if (tag.isPresent()) {
            return new ResponseEntity<Tag>(tag.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<Tag>(HttpStatus.NOT_FOUND);

        }
    }

    @Override
    public ResponseEntity<List<Tag>> getAllTags(
            @ApiParam(value = "filter query (lucene syntax like fq=\"labels:opc AND datasources:win32\")") @Valid @RequestParam(value = "fq", required = false) String fq,
            @ApiParam(value = "max number of elements to return") @Valid @RequestParam(value = "limit", required = false) Integer limit,
            @ApiParam(value = "sort query <field name>+<direction>[,<field name>+<direction>] (syntax like sort=last_modification_date desc )") @Valid @RequestParam(value = "sort", required = false) String sort) {
        Optional<Integer> limitO = limit == null ? Optional.empty() : Optional.of(limit);
        Optional<String> sortO = sort == null ? Optional.empty() : Optional.of(sort);
        return new ResponseEntity<List<Tag>>(
                service.getAllTags(fq, limitO, sortO),
                HttpStatus.OK
        );
    }

    public ResponseEntity<Tag> getTag(@ApiParam(value = "id of the tag to return", required = true) @PathVariable("tagId") String tagId) {
        Optional<Tag> tag = service.getTag(tagId);
        if (tag.isPresent()) {
            return new ResponseEntity<Tag>(tag.get(), HttpStatus.OK);

        } else {
            return new ResponseEntity<Tag>(HttpStatus.NOT_FOUND);

        }
    }

    @Override
    public ResponseEntity<Measures> getTagMeasures(
            @ApiParam(value = "id of the tag", required = true) @PathVariable("tagId") String tagId,
            @ApiParam(value = "date de début (borne inf) peut-être exprimée sous les formats suivants :   timestamp : 4578965   date-time : 2015-11-25T12:06:57.330Z   relatif   : NOW-30DAYS ")
                @Valid @RequestParam(value = "start", required = false) String start,
            @ApiParam(value = "date de fin (borne sup) peut-être exprimée sous les formats suivants :   timestamp : 4578965   date-time : 2015-11-25T12:06:57.330Z   relatif   : NOW-30DAYS ")
                @Valid @RequestParam(value = "end", required = false) String end,
            @ApiParam(value = "Multiple analyses, aggregations, and transformations are allowed per query. If so, Chronix will first execute the transformations in the order they occur. Then it executes the analyses and aggregations on the result of the chained transformations. For example the query:    max;min;trend;movavg:10,minutes;scale:4  is executed as follows:    Calculate the moving average   Scale the result of the moving average by 4   Calculate the max, min, and the trend based on the prior result. ")
                @Valid @RequestParam(value = "functions", required = false) String functions,
            @ApiParam(value = "will retrieve only function values, no data points", defaultValue = "false")
                @Valid @RequestParam(value = "no_values", required = false, defaultValue = "false") Boolean noValues) {
        Optional<Tag> tagO = service.getTag(tagId);
        if (tagO.isPresent()) {
            Tag tag = tagO.get();
            Optional<Measures> measures = measuresApiService.getTagMeasures(tag.getNodeId(), tag.getDatasourceId(),
                    start, end, functions, noValues);
            if (measures.isPresent()) {
                return new ResponseEntity<Measures>(measures.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Measures>(HttpStatus.NOT_FOUND);

            }
        } else {
            return new ResponseEntity<Measures>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<List<Measures>> getTagMeasures(@Valid @RequestBody List<MeasuresRequest> requests) {
        List<Measures> measures = requests.stream()
                .map(req -> this.getTagMeasuresIfExist(req.getTagId(), req.getStart(),
                    req.getEnd(), req.getFunction(), req.isNoValues()))
                .flatMap(o -> o.isPresent() ? java.util.stream.Stream.of(o.get()) : Stream.empty())
                .collect(Collectors.toList());
        if (measures.isEmpty()) return new ResponseEntity<List<Measures>>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<List<Measures>>(measures, HttpStatus.OK);
    }

    private Optional<Measures> getTagMeasuresIfExist(String tagId, String start,
                                              String end, String functions, Boolean noValues) {
        Optional<Tag> tagO = service.getTag(tagId);
        if (tagO.isPresent()) {
            Tag tag = tagO.get();
            return measuresApiService.getTagMeasures(tag.getNodeId(), tag.getDatasourceId(),
                    start, end, functions, noValues);
        } else {
            return Optional.empty();
        }
    }




    @Override
    public ResponseEntity<Measures> getTagStats(@ApiParam(value = "id of the tag",required=true) @PathVariable("tagId") String tagId) {

        Optional<Tag> tagO = service.getTag(tagId);
        if (tagO.isPresent()) {
            Tag tag = tagO.get();
            Optional<Measures> measures = measuresApiService.getTagStats(tag.getNodeId(), tag.getDatasourceId());
            if (measures.isPresent()) {
                return new ResponseEntity<Measures>(measures.get(), HttpStatus.OK);

            } else {
                return new ResponseEntity<Measures>(HttpStatus.NOT_FOUND);

            }
        } else {
            return new ResponseEntity<Measures>(HttpStatus.NOT_FOUND);
        }
    }


    @Override
    public ResponseEntity<List<TreeNode>> getTreeTag(@Valid @RequestParam(value = "limit", required = false, defaultValue="100") Integer limit) {
        List<TreeNode> treeTag = service.getTreeTag(0, limit);
        return new ResponseEntity<List<TreeNode>>(treeTag, HttpStatus.OK);
    }


    @Override
    public ResponseEntity<List<Header>> getTagsCsvHeaders() {
        return new ResponseEntity<List<Header>>(TagImportCsv.getTagsCsvHeaders(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BulkLoad> importTagsFromCsv(
            @Valid @RequestPart("file") MultipartFile content,
            @Valid @RequestParam(value = "separator", required = false, defaultValue=";") String separator,
            @Valid @RequestParam(value = "charset", required = false, defaultValue="UTF-8") String charset,
            @Valid @RequestParam(value = "bulkSize", required = false, defaultValue="10000") Integer bulkSize
    ) {
        Charset encoding = Charset.forName(charset);
        BulkLoad bl = this.service.importCsvAsTags(content, separator.charAt(0), encoding, bulkSize);
        return new ResponseEntity<BulkLoad>(bl, HttpStatus.OK);
    }


    @Override
    public ResponseEntity<BulkLoad> postTagMeasures(@ApiParam(value = "file detail") @Valid @RequestPart("file") MultipartFile content, @ApiParam(value = "the csv file content", defaultValue = ";") @Valid @RequestParam(value = "csv_delimiter", required = false, defaultValue = ";") String csvDelimiter, @ApiParam(value = "valid values LONG (ms since 1970),   INSTANT (default java 8 instant),   'SDF-FORMAT' e.g dd.MM.yyyy HH:mm:ss.SSS ", defaultValue = "dd.MM.yyyy HH:mm:ss.SSS") @Valid @RequestParam(value = "date_format", required = false, defaultValue = "dd.MM.yyyy HH:mm:ss.SSS") String dateFormat, @ApiParam(value = "valid values ENGLISH, GERMAN", defaultValue = "ENGLISH") @Valid @RequestParam(value = "number_format", required = false, defaultValue = "ENGLISH") String numberFormat, @ApiParam(value = "") @Valid @RequestParam(value = "attribute_fields", required = false) String attributeFields, @ApiParam(value = "will discard all previously loaded data (use it with great care)", defaultValue = "false") @Valid @RequestParam(value = "clean_import", required = false, defaultValue = "false") Boolean cleanImport, @ApiParam(value = "the number of points by chunk") @Valid @RequestParam(value = "points_by_chunk", required = false) Integer pointsByChunk) {


        return new ResponseEntity<BulkLoad>(measuresApiService.uploadTagMeasures(content, csvDelimiter, dateFormat, numberFormat, attributeFields, cleanImport, pointsByChunk), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BulkLoad> postTagMeasuresGenerator(@ApiParam(value = "file detail") @Valid @RequestPart("file") MultipartFile config, @ApiParam(value = "") @Valid @RequestParam(value = "attribute_fields", required = false) String attributeFields, @ApiParam(value = "will discard all previously loaded data (use it with great care)", defaultValue = "false") @Valid @RequestParam(value = "clean_import", required = false, defaultValue = "false") Boolean cleanImport) {


        return new ResponseEntity<BulkLoad>(measuresApiService.launchTagMeasuresGenerator(config, attributeFields, cleanImport), HttpStatus.OK);

    }

}
