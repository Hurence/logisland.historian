package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.api.*;
import com.hurence.logisland.historian.rest.v1.model.*;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

import com.hurence.logisland.historian.rest.v1.model.Error;
import com.hurence.logisland.historian.rest.v1.model.Tag;

import java.util.List;
import com.hurence.logisland.historian.rest.v1.api.NotFoundException;
import org.springframework.stereotype.Controller;

import java.io.InputStream;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.validation.constraints.*;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-16T16:36:23.971+02:00")
public abstract class TagsApiService {
    public abstract Response addTagWithId(Tag body,String itemId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response deleteTag(String itemId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response getAllTags( String fq,SecurityContext securityContext) throws NotFoundException;
    public abstract Response getTag(String itemId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response updateTag(String itemId,Tag tag,SecurityContext securityContext) throws NotFoundException;
}
