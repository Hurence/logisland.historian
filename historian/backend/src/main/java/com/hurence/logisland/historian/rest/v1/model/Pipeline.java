package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.hurence.logisland.historian.rest.v1.model.Processor;
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
* Tracks stream processing pipeline configuration
*/
    @ApiModel(description = "Tracks stream processing pipeline configuration")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-09-27T15:16:49.275+02:00")


@SolrDocument(solrCoreName = "historian")
public class Pipeline  implements Serializable {
        @JsonProperty("lastModified")
        @Indexed(name = "lastModified")
        private String lastModified = null;

        @JsonProperty("modificationReason")
        @Indexed(name = "modificationReason")
        private String modificationReason = null;

        @JsonProperty("processors")
        @Indexed(name = "processors")
        private List<Processor> processors = null;

        public Pipeline lastModified(String lastModified) {
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

        public Pipeline setLastModified(String lastModified) {
        this.lastModified = lastModified;
        return this;
        }

        public Pipeline modificationReason(String modificationReason) {
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

        public Pipeline setModificationReason(String modificationReason) {
        this.modificationReason = modificationReason;
        return this;
        }

        public Pipeline processors(List<Processor> processors) {
        this.processors = processors;
        return this;
        }

            public Pipeline addProcessorsItem(Processor processorsItem) {
                if (this.processors == null) {
                this.processors = new ArrayList<Processor>();
                }
            this.processors.add(processorsItem);
            return this;
            }

    /**
        * Get processors
    * @return processors
    **/
        @JsonProperty("processors")
    @ApiModelProperty(value = "")
    
  @Valid

  public List<Processor> getProcessors() {
    return processors;
    }

        public Pipeline setProcessors(List<Processor> processors) {
        this.processors = processors;
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
        Pipeline pipeline = (Pipeline) o;
        return Objects.equals(this.lastModified, pipeline.lastModified) &&
        Objects.equals(this.modificationReason, pipeline.modificationReason) &&
        Objects.equals(this.processors, pipeline.processors);
    }

    @Override
    public int hashCode() {
    return Objects.hash(lastModified, modificationReason, processors);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    lastModified: ").append(toIndentedString(lastModified)).append("\n");
sb.append("    modificationReason: ").append(toIndentedString(modificationReason)).append("\n");
sb.append("    processors: ").append(toIndentedString(processors)).append("\n");
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
