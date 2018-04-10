package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.*;
import com.hurence.logisland.historian.rest.v1.api.JobsApiService;
import com.hurence.logisland.historian.rest.v1.api.factories.JobsApiServiceFactory;

import io.swagger.annotations.ApiParam;
import io.swagger.jaxrs.*;

import com.hurence.logisland.historian.rest.v1.model.Error;
import com.hurence.logisland.historian.rest.v1.model.Job;

import java.util.Map;
import java.util.List;
import com.hurence.logisland.historian.rest.v1.api.NotFoundException;

import java.io.InputStream;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.servlet.ServletConfig;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.*;
import javax.validation.constraints.*;

@Path("/jobs")


@io.swagger.annotations.Api(description = "the jobs API")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-10T20:51:14.764+02:00")
public class JobsApi  {
   private final JobsApiService delegate;

   public JobsApi(@Context ServletConfig servletContext) {
      JobsApiService delegate = null;

      if (servletContext != null) {
         String implClass = servletContext.getInitParameter("JobsApi.implementation");
         if (implClass != null && !"".equals(implClass.trim())) {
            try {
               delegate = (JobsApiService) Class.forName(implClass).newInstance();
            } catch (Exception e) {
               throw new RuntimeException(e);
            }
         } 
      }

      if (delegate == null) {
         delegate = JobsApiServiceFactory.getJobsApi();
      }

      this.delegate = delegate;
   }

    @POST
    
    
    
    @io.swagger.annotations.ApiOperation(value = "create new job", notes = "store a new job configuration if valid", response = Job.class, tags={ "job", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Job successfuly created", response = Job.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid ID supplied", response = Void.class),
        
        @io.swagger.annotations.ApiResponse(code = 404, message = "Job not found", response = Void.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response addJob(@ApiParam(value = "Job to add to the store" ,required=true) Job job
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.addJob(job,securityContext);
    }
    @POST
    @Path("/{jobId}")
    
    
    @io.swagger.annotations.ApiOperation(value = "create new job", notes = "store a new job configuration if valid", response = Job.class, tags={ "job", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Job successfuly created", response = Job.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid ID supplied", response = Void.class),
        
        @io.swagger.annotations.ApiResponse(code = 404, message = "Job not found", response = Void.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response addJobWithId(@ApiParam(value = "Job configuration to add to the store" ,required=true) Job body
,@ApiParam(value = "JobId to add to the store",required=true) @PathParam("jobId") String jobId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.addJobWithId(body,jobId,securityContext);
    }
    @DELETE
    @Path("/{jobId}")
    
    
    @io.swagger.annotations.ApiOperation(value = "delete job", notes = "remove the corresponding Job definition and stop if its currently running", response = Job.class, tags={ "job", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "job successfully removed", response = Job.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid ID supplied", response = Void.class),
        
        @io.swagger.annotations.ApiResponse(code = 404, message = "Job not found", response = Void.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response deleteJob(@ApiParam(value = "id of the job to return",required=true) @PathParam("jobId") String jobId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.deleteJob(jobId,securityContext);
    }
    @GET
    
    
    
    @io.swagger.annotations.ApiOperation(value = "get all jobs", notes = "retrieve all jobs (retrieve only summary fields)", response = Job.class, responseContainer = "List", tags={ "job", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "job configuration list", response = Job.class, responseContainer = "List"),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response getAllJobs(@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getAllJobs(securityContext);
    }
    @GET
    @Path("/{jobId}")
    
    @Produces({ "application/json", "text/plain" })
    @io.swagger.annotations.ApiOperation(value = "get job", notes = "get the corresponding Job definition", response = Job.class, tags={ "job", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "job definition", response = Job.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response getJob(@ApiParam(value = "id of the job to return",required=true) @PathParam("jobId") String jobId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getJob(jobId,securityContext);
    }
    @POST
    @Path("/{jobId}/pause")
    
    
    @io.swagger.annotations.ApiOperation(value = "pause job", notes = "pause the corresponding Job", response = Job.class, tags={ "job", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "job successfuly paused", response = Job.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response pauseJob(@ApiParam(value = "id of the job to return",required=true) @PathParam("jobId") String jobId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.pauseJob(jobId,securityContext);
    }
    @POST
    @Path("/{jobId}/restart")
    
    
    @io.swagger.annotations.ApiOperation(value = "start job", notes = "start the corresponding Job definition", response = Job.class, tags={ "job", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "job successfuly started", response = Job.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response reStartJob(@ApiParam(value = "id of the job to restart",required=true) @PathParam("jobId") String jobId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.reStartJob(jobId,securityContext);
    }
    @POST
    @Path("/{jobId}/shutdown")
    
    
    @io.swagger.annotations.ApiOperation(value = "shutdown job", notes = "shutdown the running Job", response = Job.class, tags={ "job", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "job successfuly started", response = Job.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response shutdownJob(@ApiParam(value = "id of the job to return",required=true) @PathParam("jobId") String jobId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.shutdownJob(jobId,securityContext);
    }
    @POST
    @Path("/{jobId}/start")
    
    
    @io.swagger.annotations.ApiOperation(value = "start job", notes = "start the corresponding Job definition", response = Job.class, tags={ "job", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "job successfuly started", response = Job.class),
        
        @io.swagger.annotations.ApiResponse(code = 200, message = "unexpected error", response = Error.class) })
    public Response startJob(@ApiParam(value = "id of the job to return",required=true) @PathParam("jobId") String jobId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.startJob(jobId,securityContext);
    }
    @PUT
    @Path("/{jobId}")
    
    
    @io.swagger.annotations.ApiOperation(value = "update job", notes = "update an existing job configuration if valid", response = Job.class, tags={ "job", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Job successfuly created", response = Job.class) })
    public Response updateJob(@ApiParam(value = "Job to add to the store",required=true) @PathParam("jobId") String jobId
,@ApiParam(value = "Job to add to the store" ,required=true) Job job
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.updateJob(jobId,job,securityContext);
    }
}
