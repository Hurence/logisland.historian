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
* Function
*/
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T15:14:50.257+02:00")

@SolrDocument(solrCoreName = "historian")
public class Function  implements Serializable {
        @JsonProperty("name")
        @Indexed(name = "name")
        private String name = null;

        @JsonProperty("value")
        @Indexed(name = "value")
        private Double value = null;

        public Function name(String name) {
        this.name = name;
        return this;
        }

    /**
        * Get name
    * @return name
    **/
        @JsonProperty("name")
    @ApiModelProperty(value = "")
    

  public String getName() {
    return name;
    }

        public void setName(String name) {
        this.name = name;
        }

        public Function value(Double value) {
        this.value = value;
        return this;
        }

    /**
        * Get value
    * @return value
    **/
        @JsonProperty("value")
    @ApiModelProperty(value = "")
    

  public Double getValue() {
    return value;
    }

        public void setValue(Double value) {
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
        Function function = (Function) o;
        return Objects.equals(this.name, function.name) &&
        Objects.equals(this.value, function.value);
    }

    @Override
    public int hashCode() {
    return Objects.hash(name, value);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("class Function {\n");

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
return o.toString().replace("\n", "\n    ");
}
}
