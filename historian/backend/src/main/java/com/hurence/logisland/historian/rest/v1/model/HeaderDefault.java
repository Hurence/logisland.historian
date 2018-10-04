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
* HeaderDefault
*/

@SolrDocument(solrCoreName = "historian")
public class HeaderDefault  implements Serializable {
        @JsonProperty("name")
        @Indexed(name = "name")
        private String name = null;

        @JsonProperty("value")
        @Indexed(name = "value")
        private String value = null;

        public HeaderDefault name(String name) {
        this.name = name;
        return this;
        }

    /**
        * Get name
    * @return name
    **/
        @JsonProperty("name")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public String getName() {
    return name;
    }

        public HeaderDefault setName(String name) {
        this.name = name;
        return this;
        }

        public HeaderDefault value(String value) {
        this.value = value;
        return this;
        }

    /**
        * Get value
    * @return value
    **/
        @JsonProperty("value")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public String getValue() {
    return value;
    }

        public HeaderDefault setValue(String value) {
        this.value = value;
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
        HeaderDefault headerDefault = (HeaderDefault) o;
        return Objects.equals(this.name, headerDefault.name) &&
        Objects.equals(this.value, headerDefault.value);
    }

    @Override
    public int hashCode() {
    return Objects.hash(name, value);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    name: ").append(toIndentedString(name)).append("\n");
sb.append("    value: ").append(toIndentedString(value)).append("\n");
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
