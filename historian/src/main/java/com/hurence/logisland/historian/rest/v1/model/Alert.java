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


import org.springframework.data.annotation.Id;
import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;

/**
* Alert
*/
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-18T17:50:40.316+02:00")

@SolrDocument(solrCoreName = "historian")
public class Alert  implements Serializable {
        @JsonProperty("time")
        @Indexed(name = "time")
        private String time = null;

        @JsonProperty("message")
        @Indexed(name = "message")
        private String message = null;

        @JsonProperty("severity")
        @Indexed(name = "severity")
        private Integer severity = null;

        @JsonProperty("tag")
        @Indexed(name = "tag")
        private Tag tag = null;

        public Alert time(String time) {
        this.time = time;
        return this;
        }

    /**
        * Get time
    * @return time
    **/
        @JsonProperty("time")
    @ApiModelProperty(value = "")
    

  public String getTime() {
    return time;
    }

        public void setTime(String time) {
        this.time = time;
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

        public void setMessage(String message) {
        this.message = message;
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

        public void setSeverity(Integer severity) {
        this.severity = severity;
        }

        public Alert tag(Tag tag) {
        this.tag = tag;
        return this;
        }

    /**
        * Get tag
    * @return tag
    **/
        @JsonProperty("tag")
    @ApiModelProperty(value = "")
    
  @Valid

  public Tag getTag() {
    return tag;
    }

        public void setTag(Tag tag) {
        this.tag = tag;
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
        return Objects.equals(this.time, alert.time) &&
        Objects.equals(this.message, alert.message) &&
        Objects.equals(this.severity, alert.severity) &&
        Objects.equals(this.tag, alert.tag);
    }

    @Override
    public int hashCode() {
    return Objects.hash(time, message, severity, tag);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("class Alert {\n");

sb.append("    time: ").append(toIndentedString(time)).append("\n");
sb.append("    message: ").append(toIndentedString(message)).append("\n");
sb.append("    severity: ").append(toIndentedString(severity)).append("\n");
sb.append("    tag: ").append(toIndentedString(tag)).append("\n");
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
return o.toString().replace("\n", "\n    ");
}
}
