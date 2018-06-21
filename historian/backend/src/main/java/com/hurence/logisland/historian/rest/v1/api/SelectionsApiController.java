package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.Selection;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.service.SecurityService;
import com.hurence.logisland.historian.service.SelectionsApiService;
import com.hurence.logisland.historian.service.TagsApiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Controller
public class SelectionsApiController implements SelectionsApi {

    private static final Logger log = LoggerFactory.getLogger(SelectionsApiController.class);

    private final SelectionsApiService service;
    private final TagsApiService tagApiService;
    private final SecurityService securityService;


    @org.springframework.beans.factory.annotation.Autowired
    public SelectionsApiController(SelectionsApiService service,
                                   TagsApiService tagApiService,
                                   SecurityService securityService) {
        this.service = service;
        this.tagApiService = tagApiService;
        this.securityService = securityService;
    }

    @Override
    public ResponseEntity<Selection> addSelectionWithId(@Valid @RequestBody Selection body,
                                                        @PathVariable("selectionId") String selectionId) {
        log.info("user is " + securityService.getUserName());
        Optional<Selection> selection = service.addSelectionWithId(body, selectionId);
        if (selection.isPresent()) {
            return new ResponseEntity<Selection>(selection.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<Selection>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<Selection> deleteSelection(@PathVariable("selectionId") String selectionId) {
        log.info("user is " + securityService.getUserName());
        Optional<Selection> selection = service.deleteSelection(selectionId);
        if (selection.isPresent()) {
            return new ResponseEntity<Selection>(selection.get(), HttpStatus.OK);

        } else {
            return new ResponseEntity<Selection>(HttpStatus.NOT_FOUND);

        }
    }

    @Override
    public ResponseEntity<List<Tag>> getAllTagsFromSelection(@PathVariable("selectionId") String selectionId) {
        return null;
    }

    @Override
    public ResponseEntity<List<Selection>> getAllUserSelection() {
        return new ResponseEntity<List<Selection>>(service.getAllUserSelection(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Selection> getSelection(@PathVariable("selectionId") String selectionId) {
        log.info("user is " + securityService.getUserName());
        Optional<Selection> selection = service.getSelection(selectionId);
        if (selection.isPresent()) {
            return new ResponseEntity<Selection>(selection.get(), HttpStatus.OK);

        } else {
            return new ResponseEntity<Selection>(HttpStatus.NOT_FOUND);

        }
    }

    @Override
    public ResponseEntity<Selection> updateSelection(@PathVariable("selectionId") String selectionId,
                                                     @Valid @RequestBody Selection selection) {
        log.info("user is " + securityService.getUserName());
        Optional<Selection> updatedSelection = service.updateSelection(selection, selectionId);
        if (updatedSelection.isPresent()) {
            return new ResponseEntity<Selection>(updatedSelection.get(), HttpStatus.OK);

        } else {
            return new ResponseEntity<Selection>(HttpStatus.NOT_FOUND);

        }
    }


}
