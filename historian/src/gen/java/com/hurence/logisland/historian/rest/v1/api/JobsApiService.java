package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.api.*;
import com.hurence.logisland.historian.rest.v1.model.*;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

import com.hurence.logisland.historian.rest.v1.model.Error;
import com.hurence.logisland.historian.rest.v1.model.Job;

import java.util.List;
import com.hurence.logisland.historian.rest.v1.api.NotFoundException;

import java.io.InputStream;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.validation.constraints.*;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-10T20:51:14.764+02:00")
public abstract class JobsApiService {
    public abstract Response addJob(Job job,SecurityContext securityContext) throws NotFoundException;
    public abstract Response addJobWithId(Job body,String jobId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response deleteJob(String jobId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response getAllJobs(SecurityContext securityContext) throws NotFoundException;
    public abstract Response getJob(String jobId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response pauseJob(String jobId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response reStartJob(String jobId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response shutdownJob(String jobId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response startJob(String jobId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response updateJob(String jobId,Job job,SecurityContext securityContext) throws NotFoundException;
}
