package com.hurence.logisland.historian.rest.v1.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.service.TagsApiService;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.util.Optional;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-18T14:55:12.030+02:00")

@Controller
public class TagsApiController implements TagsApi {

    private static final Logger log = LoggerFactory.getLogger(TagsApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    private final TagsApiService service;


    @org.springframework.beans.factory.annotation.Autowired
    public TagsApiController(ObjectMapper objectMapper, HttpServletRequest request, TagsApiService service) {
        this.objectMapper = objectMapper;
        this.request = request;
        this.service = service;
    }

    public ResponseEntity<Tag> addTagWithId(@ApiParam(value = "Tag resource to add", required = true) @Valid @RequestBody Tag body, @ApiParam(value = "itemId to", required = true) @PathVariable("itemId") String itemId) {
        Optional<Tag> tag = service.addTagWithId(body, itemId);
        if (tag.isPresent()) {
            return new ResponseEntity<Tag>(tag.get(), HttpStatus.OK);

        } else {
            return new ResponseEntity<Tag>(HttpStatus.BAD_REQUEST);

        }
    }

    public ResponseEntity<Tag> deleteTag(@ApiParam(value = "id of the tag to be deleted", required = true) @PathVariable("itemId") String itemId) {

        Optional<Tag> tag = service.deleteTag(itemId);
        if (tag.isPresent()) {
            return new ResponseEntity<Tag>(tag.get(), HttpStatus.OK);

        } else {
            return new ResponseEntity<Tag>(HttpStatus.NOT_FOUND);

        }
    }

    public ResponseEntity<List<Tag>> getAllTags(@ApiParam(value = "filter query (lucene syntax like fq=\"labels:opc AND datasources:win32\")") @Valid @RequestParam(value = "fq", required = false) String fq) {
        return new ResponseEntity<List<Tag>>(service.getAllTags(fq),HttpStatus.OK);
    }



    public ResponseEntity<Tag> getTag(@ApiParam(value = "id of the tag to return", required = true) @PathVariable("itemId") String itemId) {
        Optional<Tag> tag = service.getTag(itemId);
        if (tag.isPresent()) {
            return new ResponseEntity<Tag>(tag.get(), HttpStatus.OK);

        } else {
            return new ResponseEntity<Tag>(HttpStatus.NOT_FOUND);

        }
    }

    public ResponseEntity<Tag> updateTag(@ApiParam(value = "itemId to be updated", required = true) @PathVariable("itemId") String itemId, @ApiParam(value = "new Tag definition", required = true) @Valid @RequestBody Tag tag) {
        Optional<Tag> updatedTag = service.updateTag(tag, itemId);
        if (updatedTag.isPresent()) {
            return new ResponseEntity<Tag>(updatedTag.get(), HttpStatus.OK);

        } else {
            return new ResponseEntity<Tag>(HttpStatus.NOT_FOUND);

        }
    }

}
