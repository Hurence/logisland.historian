package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
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
* ImportTagReport
*/

@SolrDocument(solrCoreName = "historian")
public class ImportTagReport  implements Serializable {
        @JsonProperty("start_time")
        @Indexed(name = "start_time")
        private Long startTime = null;

        @JsonProperty("import_duration")
        @Indexed(name = "import_duration")
        private Integer importDuration = null;

        @JsonProperty("num_tags_imported")
        @Indexed(name = "num_tags_imported")
        private Long numTagsImported = null;

        @JsonProperty("num_tags_not_imported")
        @Indexed(name = "num_tags_not_imported")
        private Long numTagsNotImported = null;

        @JsonProperty("errors")
        @Indexed(name = "errors")
        private List<String> errors = null;

        public ImportTagReport startTime(Long startTime) {
        this.startTime = startTime;
        return this;
        }

    /**
        * timestamp
    * @return startTime
    **/
        @JsonProperty("start_time")
    @ApiModelProperty(value = "timestamp")
    

  public Long getStartTime() {
    return startTime;
    }

        public ImportTagReport setStartTime(Long startTime) {
        this.startTime = startTime;
        return this;
        }

        public ImportTagReport importDuration(Integer importDuration) {
        this.importDuration = importDuration;
        return this;
        }

    /**
        * Get importDuration
    * @return importDuration
    **/
        @JsonProperty("import_duration")
    @ApiModelProperty(value = "")
    

  public Integer getImportDuration() {
    return importDuration;
    }

        public ImportTagReport setImportDuration(Integer importDuration) {
        this.importDuration = importDuration;
        return this;
        }

        public ImportTagReport numTagsImported(Long numTagsImported) {
        this.numTagsImported = numTagsImported;
        return this;
        }

    /**
        * Get numTagsImported
    * @return numTagsImported
    **/
        @JsonProperty("num_tags_imported")
    @ApiModelProperty(value = "")
    

  public Long getNumTagsImported() {
    return numTagsImported;
    }

        public ImportTagReport setNumTagsImported(Long numTagsImported) {
        this.numTagsImported = numTagsImported;
        return this;
        }

        public ImportTagReport numTagsNotImported(Long numTagsNotImported) {
        this.numTagsNotImported = numTagsNotImported;
        return this;
        }

    /**
        * Get numTagsNotImported
    * @return numTagsNotImported
    **/
        @JsonProperty("num_tags_not_imported")
    @ApiModelProperty(value = "")
    

  public Long getNumTagsNotImported() {
    return numTagsNotImported;
    }

        public ImportTagReport setNumTagsNotImported(Long numTagsNotImported) {
        this.numTagsNotImported = numTagsNotImported;
        return this;
        }

        public ImportTagReport errors(List<String> errors) {
        this.errors = errors;
        return this;
        }

            public ImportTagReport addErrorsItem(String errorsItem) {
                if (this.errors == null) {
                this.errors = new ArrayList<String>();
                }
            this.errors.add(errorsItem);
            return this;
            }

    /**
        * Get errors
    * @return errors
    **/
        @JsonProperty("errors")
    @ApiModelProperty(value = "")
    

  public List<String> getErrors() {
    return errors;
    }

        public ImportTagReport setErrors(List<String> errors) {
        this.errors = errors;
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
        ImportTagReport importTagReport = (ImportTagReport) o;
        return Objects.equals(this.startTime, importTagReport.startTime) &&
        Objects.equals(this.importDuration, importTagReport.importDuration) &&
        Objects.equals(this.numTagsImported, importTagReport.numTagsImported) &&
        Objects.equals(this.numTagsNotImported, importTagReport.numTagsNotImported) &&
        Objects.equals(this.errors, importTagReport.errors);
    }

    @Override
    public int hashCode() {
    return Objects.hash(startTime, importDuration, numTagsImported, numTagsNotImported, errors);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    startTime: ").append(toIndentedString(startTime)).append("\n");
sb.append("    importDuration: ").append(toIndentedString(importDuration)).append("\n");
sb.append("    numTagsImported: ").append(toIndentedString(numTagsImported)).append("\n");
sb.append("    numTagsNotImported: ").append(toIndentedString(numTagsNotImported)).append("\n");
sb.append("    errors: ").append(toIndentedString(errors)).append("\n");
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
