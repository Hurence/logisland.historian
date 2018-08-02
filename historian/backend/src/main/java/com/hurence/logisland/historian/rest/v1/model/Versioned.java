package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.Serializable;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;
import org.threeten.bp.format.DateTimeFormatter;
import org.threeten.bp.OffsetDateTime;

/**
* a versioned component
*/
    @ApiModel(description = "a versioned component")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-08-02T11:47:49.850+02:00")


@SolrDocument(solrCoreName = "historian")
public class Versioned  implements Serializable {
        @JsonProperty("lastModified")
        @Indexed(name = "lastModified")
        private String lastModified = null;

        @JsonProperty("modificationReason")
        @Indexed(name = "modificationReason")
        private String modificationReason = null;

        public Versioned lastModified(String lastModified) {
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

        public Versioned setLastModified(String lastModified) {
        this.lastModified = lastModified;
        return this;
        }

        public Versioned modificationReason(String modificationReason) {
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

        public Versioned setModificationReason(String modificationReason) {
        this.modificationReason = modificationReason;
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
        Versioned versioned = (Versioned) o;
        return Objects.equals(this.lastModified, versioned.lastModified) &&
        Objects.equals(this.modificationReason, versioned.modificationReason);
    }

    @Override
    public int hashCode() {
    return Objects.hash(lastModified, modificationReason);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    lastModified: ").append(toIndentedString(lastModified)).append("\n");
sb.append("    modificationReason: ").append(toIndentedString(modificationReason)).append("\n");
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
