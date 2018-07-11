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
* InlineResponse201
*/
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-07-12T10:10:01.878+02:00")

@SolrDocument(solrCoreName = "historian")
public class InlineResponse201  implements Serializable {
        @JsonProperty("id")
        @Indexed(name = "id")
        private String id = null;

        public InlineResponse201 id(String id) {
        this.id = id;
        return this;
        }

    /**
        * Get id
    * @return id
    **/
        @JsonProperty("id")
    @ApiModelProperty(value = "")
    

  public String getId() {
    return id;
    }

        public void setId(String id) {
        this.id = id;
        }


    @Override
    public boolean equals(java.lang.Object o) {
    if (this == o) {
    return true;
    }
    if (o == null || getClass() != o.getClass()) {
    return false;
    }
        InlineResponse201 inlineResponse201 = (InlineResponse201) o;
        return Objects.equals(this.id, inlineResponse201.id);
    }

    @Override
    public int hashCode() {
    return Objects.hash(id);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("class InlineResponse201 {\n");

sb.append("    id: ").append(toIndentedString(id)).append("\n");
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
