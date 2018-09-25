package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.hurence.logisland.historian.rest.v1.model.Tag;
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
* Alert
*/
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-09-25T12:56:06.238+02:00")


@SolrDocument(solrCoreName = "historian")
public class Alert  implements Serializable {
        @JsonProperty("record_type")
        @Indexed(name = "record_type")
        private String recordType = "alert";

        @JsonProperty("timestamp")
        @Indexed(name = "timestamp")
        private Long timestamp = null;

        @JsonProperty("message")
        @Indexed(name = "message")
        private String message = null;

        @JsonProperty("severity")
        @Indexed(name = "severity")
        private Integer severity = null;

        @JsonProperty("tag_id")
        @Indexed(name = "tag_id")
        private Tag tagId = null;

        public Alert recordType(String recordType) {
        this.recordType = recordType;
        return this;
        }

    /**
        * Get recordType
    * @return recordType
    **/
        @JsonProperty("record_type")
    @ApiModelProperty(value = "")
    

  public String getRecordType() {
    return recordType;
    }

        public Alert setRecordType(String recordType) {
        this.recordType = recordType;
        return this;
        }

        public Alert timestamp(Long timestamp) {
        this.timestamp = timestamp;
        return this;
        }

    /**
        * Get timestamp
    * @return timestamp
    **/
        @JsonProperty("timestamp")
    @ApiModelProperty(value = "")
    

  public Long getTimestamp() {
    return timestamp;
    }

        public Alert setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
        return this;
        }

        public Alert message(String message) {
        this.message = message;
        return this;
        }

    /**
        * Get message
    * @return message
    **/
        @JsonProperty("message")
    @ApiModelProperty(value = "")
    

  public String getMessage() {
    return message;
    }

        public Alert setMessage(String message) {
        this.message = message;
        return this;
        }

        public Alert severity(Integer severity) {
        this.severity = severity;
        return this;
        }

    /**
        * Get severity
    * @return severity
    **/
        @JsonProperty("severity")
    @ApiModelProperty(value = "")
    

  public Integer getSeverity() {
    return severity;
    }

        public Alert setSeverity(Integer severity) {
        this.severity = severity;
        return this;
        }

        public Alert tagId(Tag tagId) {
        this.tagId = tagId;
        return this;
        }

    /**
        * Get tagId
    * @return tagId
    **/
        @JsonProperty("tag_id")
    @ApiModelProperty(value = "")
    
  @Valid

  public Tag getTagId() {
    return tagId;
    }

        public Alert setTagId(Tag tagId) {
        this.tagId = tagId;
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
        Alert alert = (Alert) o;
        return Objects.equals(this.recordType, alert.recordType) &&
        Objects.equals(this.timestamp, alert.timestamp) &&
        Objects.equals(this.message, alert.message) &&
        Objects.equals(this.severity, alert.severity) &&
        Objects.equals(this.tagId, alert.tagId);
    }

    @Override
    public int hashCode() {
    return Objects.hash(recordType, timestamp, message, severity, tagId);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    recordType: ").append(toIndentedString(recordType)).append("\n");
sb.append("    timestamp: ").append(toIndentedString(timestamp)).append("\n");
sb.append("    message: ").append(toIndentedString(message)).append("\n");
sb.append("    severity: ").append(toIndentedString(severity)).append("\n");
sb.append("    tagId: ").append(toIndentedString(tagId)).append("\n");
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
