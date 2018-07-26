package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.hurence.logisland.historian.rest.v1.model.Service;
import com.hurence.logisland.historian.rest.v1.model.Stream;
import com.hurence.logisland.historian.rest.v1.model.Versioned;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.io.Serializable;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;
import org.threeten.bp.format.DateTimeFormatter;
import org.threeten.bp.OffsetDateTime;

/**
* A streaming pipeline.
*/
    @ApiModel(description = "A streaming pipeline.")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-07-25T16:53:02.030+02:00")


@SolrDocument(solrCoreName = "historian")
public class DataFlow  implements Serializable {
        @JsonProperty("lastModified")
        @Indexed(name = "lastModified")
        private String lastModified = null;

        @JsonProperty("modificationReason")
        @Indexed(name = "modificationReason")
        private String modificationReason = null;

        @JsonProperty("id")
        @Indexed(name = "id")
        private String id = null;

        @JsonProperty("services")
        @Indexed(name = "services")
        private List<Service> services = null;

        @JsonProperty("streams")
        @Indexed(name = "streams")
        private List<Stream> streams = null;

        public DataFlow lastModified(String lastModified) {
        this.lastModified = lastModified;
        return this;
        }

    /**
        * the last modified timestamp of this pipeline (used to trigger changes).
    * @return lastModified
    **/
        @JsonProperty("lastModified")
    @ApiModelProperty(required = true, value = "the last modified timestamp of this pipeline (used to trigger changes).")
      @NotNull


  public String getLastModified() {
    return lastModified;
    }

        public DataFlow setLastModified(String lastModified) {
        this.lastModified = lastModified;
        return this;
        }

        public DataFlow modificationReason(String modificationReason) {
        this.modificationReason = modificationReason;
        return this;
        }

    /**
        * Can be used to document latest changeset.
    * @return modificationReason
    **/
        @JsonProperty("modificationReason")
    @ApiModelProperty(value = "Can be used to document latest changeset.")
    

  public String getModificationReason() {
    return modificationReason;
    }

        public DataFlow setModificationReason(String modificationReason) {
        this.modificationReason = modificationReason;
        return this;
        }

        public DataFlow id(String id) {
        this.id = id;
        return this;
        }

    /**
        * The id of the dataflow.
    * @return id
    **/
        @JsonProperty("id")
    @ApiModelProperty(value = "The id of the dataflow.")
    

  public String getId() {
    return id;
    }

        public DataFlow setId(String id) {
        this.id = id;
        return this;
        }

        public DataFlow services(List<Service> services) {
        this.services = services;
        return this;
        }

            public DataFlow addServicesItem(Service servicesItem) {
                if (this.services == null) {
                this.services = new ArrayList<Service>();
                }
            this.services.add(servicesItem);
            return this;
            }

    /**
        * The service controllers.
    * @return services
    **/
        @JsonProperty("services")
    @ApiModelProperty(value = "The service controllers.")
    
  @Valid

  public List<Service> getServices() {
    return services;
    }

        public DataFlow setServices(List<Service> services) {
        this.services = services;
        return this;
        }

        public DataFlow streams(List<Stream> streams) {
        this.streams = streams;
        return this;
        }

            public DataFlow addStreamsItem(Stream streamsItem) {
                if (this.streams == null) {
                this.streams = new ArrayList<Stream>();
                }
            this.streams.add(streamsItem);
            return this;
            }

    /**
        * The engine properties.
    * @return streams
    **/
        @JsonProperty("streams")
    @ApiModelProperty(value = "The engine properties.")
    
  @Valid

  public List<Stream> getStreams() {
    return streams;
    }

        public DataFlow setStreams(List<Stream> streams) {
        this.streams = streams;
        return this;
        }


    @Override
    public boolean equals(java.lang.Object o) {
    if (this == o) {
    return true;
    }
    if (o == null || getClass() != o.getClass()) {
    return false;
    }
        DataFlow dataFlow = (DataFlow) o;
        return Objects.equals(this.lastModified, dataFlow.lastModified) &&
        Objects.equals(this.modificationReason, dataFlow.modificationReason) &&
        Objects.equals(this.id, dataFlow.id) &&
        Objects.equals(this.services, dataFlow.services) &&
        Objects.equals(this.streams, dataFlow.streams);
    }

    @Override
    public int hashCode() {
    return Objects.hash(lastModified, modificationReason, id, services, streams);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    lastModified: ").append(toIndentedString(lastModified)).append("\n");
sb.append("    modificationReason: ").append(toIndentedString(modificationReason)).append("\n");
sb.append("    id: ").append(toIndentedString(id)).append("\n");
sb.append("    services: ").append(toIndentedString(services)).append("\n");
sb.append("    streams: ").append(toIndentedString(streams)).append("\n");
sb.append("}");
return sb.toString();
}

    /**
    * Convert the given object to string with each line indented by 4 spaces
    * (except the first line).
    */
    private String toIndentedString(java.lang.Object o) {
    if (o == null) {
        return "null";
    }
    if (o instanceof OffsetDateTime) {
        return ((OffsetDateTime) o).format(DateTimeFormatter.ISO_INSTANT);
    }
        return o.toString().replace("\n", "\n    ");
    }
}
