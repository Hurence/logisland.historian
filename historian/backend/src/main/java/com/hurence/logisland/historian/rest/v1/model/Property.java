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


import org.springframework.data.annotation.Id;
import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;

/**
* Property
*/
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-26T14:57:04.764+02:00")

@SolrDocument(solrCoreName = "historian")
public class Property  implements Serializable {
        @JsonProperty("key")
        @Indexed(name = "key")
        private String key = null;

        @JsonProperty("type")
        @Indexed(name = "type")
        private String type = "string";

        @JsonProperty("value")
        @Indexed(name = "value")
        private String value = null;

        public Property key(String key) {
        this.key = key;
        return this;
        }

    /**
        * Get key
    * @return key
    **/
        @JsonProperty("key")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public String getKey() {
    return key;
    }

        public void setKey(String key) {
        this.key = key;
        }

        public Property type(String type) {
        this.type = type;
        return this;
        }

    /**
        * Get type
    * @return type
    **/
        @JsonProperty("type")
    @ApiModelProperty(value = "")
    

  public String getType() {
    return type;
    }

        public void setType(String type) {
        this.type = type;
        }

        public Property value(String value) {
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

        public void setValue(String value) {
        this.value = value;
        }


    @Override
    public boolean equals(java.lang.Object o) {
    if (this == o) {
    return true;
    }
    if (o == null || getClass() != o.getClass()) {
    return false;
    }
        Property property = (Property) o;
        return Objects.equals(this.key, property.key) &&
        Objects.equals(this.type, property.type) &&
        Objects.equals(this.value, property.value);
    }

    @Override
    public int hashCode() {
    return Objects.hash(key, type, value);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("class Property {\n");

sb.append("    key: ").append(toIndentedString(key)).append("\n");
sb.append("    type: ").append(toIndentedString(type)).append("\n");
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
return o.toString().replace("\n", "\n    ");
}
}
