package com.hurence.logisland.historian.rest.v1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;
import org.threeten.bp.OffsetDateTime;
import org.threeten.bp.format.DateTimeFormatter;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

/**
 * A streaming pipeline.
 */
@ApiModel(description = "A streaming pipeline.")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-07-18T09:24:34.438+02:00")


@SolrDocument(solrCoreName = "dataflow")
public class DataFlowSimple implements Serializable {
    @JsonProperty("lastModified")
    @Indexed(name = "lastModified")
    private Long lastModified = null;

    @JsonProperty("modificationReason")
    @Indexed(name = "modificationReason")
    private String modificationReason = null;

    @JsonProperty("id")
    @Indexed(name = "id")
    private String id = null;

    @JsonProperty("services")
    @Indexed(name = "services")
    private String services = null;

    @JsonProperty("streams")
    @Indexed(name = "streams")
    private String streams = null;

    @JsonIgnore
    @Indexed(name = "lastPingDateTime")
    private Date lastPingDateTime;


    /**
     * the last modified timestamp of this pipeline (used to trigger changes).
     *
     * @return lastModified
     **/
    @JsonProperty("lastModified")
    @ApiModelProperty(required = true, value = "the last modified timestamp of this pipeline (used to trigger changes).")
    @NotNull


    public Long getLastModified() {
        return lastModified;
    }

    public DataFlowSimple setLastModified(Long lastModified) {
        this.lastModified = lastModified;
        return this;
    }

    public DataFlowSimple modificationReason(String modificationReason) {
        this.modificationReason = modificationReason;
        return this;
    }

    /**
     * Can be used to document latest changeset.
     *
     * @return modificationReason
     **/
    @JsonProperty("modificationReason")
    @ApiModelProperty(value = "Can be used to document latest changeset.")


    public String getModificationReason() {
        return modificationReason;
    }

    public DataFlowSimple setModificationReason(String modificationReason) {
        this.modificationReason = modificationReason;
        return this;
    }

    public DataFlowSimple id(String id) {
        this.id = id;
        return this;
    }

    /**
     * The id of the dataflow.
     *
     * @return id
     **/
    @JsonProperty("id")
    @ApiModelProperty(value = "The id of the dataflow.")


    public String getId() {
        return id;
    }

    public DataFlowSimple setId(String id) {
        this.id = id;
        return this;
    }

    public DataFlowSimple services(String services) {
        this.services = services;
        return this;
    }

    /**
     * The service controllers.
     *
     * @return services
     **/
    @JsonProperty("services")
    @ApiModelProperty(value = "The service controllers.")


    public String getServices() {
        return services;
    }

    public DataFlowSimple setServices(String services) {
        this.services = services;
        return this;
    }

    public DataFlowSimple streams(String streams) {
        this.streams = streams;
        return this;
    }


    /**
     * The engine properties.
     *
     * @return streams
     **/
    @JsonProperty("streams")
    @ApiModelProperty(value = "The engine properties.")


    public String getStreams() {
        return streams;
    }

    public DataFlowSimple setStreams(String streams) {
        this.streams = streams;
        return this;
    }

    public Date getLastPingDateTime() {
        return lastPingDateTime;
    }

    public void setLastPingDateTime(Date lastPingDateTime) {
        this.lastPingDateTime = lastPingDateTime;
    }

    @Override
    public boolean equals(java.lang.Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DataFlowSimple dataFlowSimple = (DataFlowSimple) o;
        return Objects.equals(this.lastModified, dataFlowSimple.lastModified) &&
                Objects.equals(this.modificationReason, dataFlowSimple.modificationReason) &&
                Objects.equals(this.id, dataFlowSimple.id) &&
                Objects.equals(this.services, dataFlowSimple.services) &&
                Objects.equals(this.lastPingDateTime, dataFlowSimple.lastPingDateTime) &&
                Objects.equals(this.streams, dataFlowSimple.streams);
    }

    @Override
    public int hashCode() {
        return Objects.hash(lastModified, modificationReason, id, services, streams,lastPingDateTime);
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
        sb.append("    lastPingDateTime: ").append(toIndentedString(lastPingDateTime)).append("\n");

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
