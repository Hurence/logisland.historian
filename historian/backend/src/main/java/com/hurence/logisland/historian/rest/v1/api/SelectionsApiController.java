package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.PrivateSelection;
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
import java.util.stream.Collectors;

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

    public Selection convertToSelection(PrivateSelection pSelection) {
        Selection selection = new Selection();
        selection.setName(pSelection.getName());
        selection.setDescription(pSelection.getDescription());
        selection.setPermissions(pSelection.getPermissions());
        selection.setTagIds(pSelection.getTagIds());
        selection.setOwner(pSelection.getOwner());
        return selection;
    }

    public PrivateSelection buildPrivateSelection(Selection selection, String id) {
        PrivateSelection pSelection = new PrivateSelection();
        pSelection.setName(selection.getName());
        pSelection.setDescription(selection.getDescription());
        pSelection.setPermissions(selection.getPermissions());
        pSelection.setTagIds(selection.getTagIds());
        pSelection.setId(id);
        pSelection.setOwner(selection.getOwner());
        return pSelection;
    }

    public static final String ID_SEPARATOR = "|";

    public String buildId(String name, String owner) {
        return name + ID_SEPARATOR + owner;
    }

    @Override
    public ResponseEntity<Selection> addSelectionWithId(@Valid @RequestBody Selection body,
                                                        @PathVariable("selectionName") String selectionName) {
        String owner = securityService.getUserName();
        if (body.getOwner() != null) {
            if (!owner.equals(body.getOwner())) {
                return new ResponseEntity<Selection>(HttpStatus.UNAUTHORIZED);
            }
        } else {
            body.setOwner(owner);
        }
        String id = buildId(selectionName, body.getOwner());
        PrivateSelection mySelection = buildPrivateSelection(body, id);
        Optional<PrivateSelection> selection = service.addSelectionWithId(mySelection, mySelection.getId());
        if (selection.isPresent()) {
            return new ResponseEntity<Selection>(convertToSelection(selection.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<Selection>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<Selection> deleteSelection(@PathVariable("selectionName") String selectionName) {
        String id = buildId(selectionName, securityService.getUserName());
        Optional<PrivateSelection> selection = service.deleteSelection(id);
        if (selection.isPresent()) {
            return new ResponseEntity<Selection>(convertToSelection(selection.get()), HttpStatus.OK);

        } else {
            return new ResponseEntity<Selection>(HttpStatus.NOT_FOUND);

        }
    }

    @Override
    public ResponseEntity<List<Tag>> getAllTagsFromSelection(@PathVariable("selectionName") String selectionName) {
        return null;
    }

    @Override
    public ResponseEntity<List<Selection>> getAllUserSelection() {
        return new ResponseEntity<List<Selection>>(service.getAllUserSelection().stream()
                .map(this::convertToSelection)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Selection> getSelection(@PathVariable("selectionName") String selectionName) {
        String id = buildId(selectionName, securityService.getUserName());
        Optional<PrivateSelection> selection = service.getSelection(id);
        if (selection.isPresent()) {
            return new ResponseEntity<Selection>(convertToSelection(selection.get()), HttpStatus.OK);

        } else {
            return new ResponseEntity<Selection>(HttpStatus.NOT_FOUND);

        }
    }

    @Override
    public ResponseEntity<Selection> updateSelection(@PathVariable("selectionName") String selectionName,
                                                     @Valid @RequestBody Selection selection) {
        String owner = securityService.getUserName();
        if (selection.getOwner() != null) {
            if (!owner.equals(selection.getOwner())) {
                return new ResponseEntity<Selection>(HttpStatus.UNAUTHORIZED);
            }
        } else {
            selection.setOwner(owner);
        }
        String id = buildId(selectionName, selection.getOwner());
        PrivateSelection mySelection = buildPrivateSelection(selection, id);
        Optional<PrivateSelection> updatedSelection = service.updateSelection(mySelection);
        if (updatedSelection.isPresent()) {
            return new ResponseEntity<Selection>(convertToSelection(updatedSelection.get()), HttpStatus.OK);

        } else {
            return new ResponseEntity<Selection>(HttpStatus.NOT_FOUND);

        }
    }


}
