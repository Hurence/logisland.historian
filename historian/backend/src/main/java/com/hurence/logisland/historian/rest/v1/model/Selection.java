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


import org.springframework.data.annotation.Id;
import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;

/**
* a Selection is a selection of tags.
*/
    @ApiModel(description = "a Selection is a selection of tags.")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-06-19T17:59:13.992+02:00")

@SolrDocument(solrCoreName = "historian")
public class Selection  implements Serializable {
        @JsonProperty("id")
        @Indexed(name = "id")
        private String id = null;

        @JsonProperty("name")
        @Indexed(name = "name")
        private String name = null;

        @JsonProperty("owner")
        @Indexed(name = "owner")
        private String owner = null;

        @JsonProperty("tags")
        @Indexed(name = "tags")
        private List<String> tags = new ArrayList<String>();

        @JsonProperty("record_type")
        @Indexed(name = "record_type")
        private String recordType = "selection";

        public Selection id(String id) {
        this.id = id;
        return this;
        }

    /**
        * concatenation of owner with name for example
    * @return id
    **/
        @JsonProperty("id")
    @ApiModelProperty(required = true, value = "concatenation of owner with name for example")
      @NotNull


  public String getId() {
    return id;
    }

        public void setId(String id) {
        this.id = id;
        }

        public Selection name(String name) {
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

        public void setName(String name) {
        this.name = name;
        }

        public Selection owner(String owner) {
        this.owner = owner;
        return this;
        }

    /**
        * Get owner
    * @return owner
    **/
        @JsonProperty("owner")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public String getOwner() {
    return owner;
    }

        public void setOwner(String owner) {
        this.owner = owner;
        }

        public Selection tags(List<String> tags) {
        this.tags = tags;
        return this;
        }

            public Selection addTagsItem(String tagsItem) {
            this.tags.add(tagsItem);
            return this;
            }

    /**
        * list of tags id in selection
    * @return tags
    **/
        @JsonProperty("tags")
    @ApiModelProperty(required = true, value = "list of tags id in selection")
      @NotNull


  public List<String> getTags() {
    return tags;
    }

        public void setTags(List<String> tags) {
        this.tags = tags;
        }

        public Selection recordType(String recordType) {
        this.recordType = recordType;
        return this;
        }

    /**
        * Get recordType
    * @return recordType
    **/
        @JsonProperty("record_type")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public String getRecordType() {
    return recordType;
    }

        public void setRecordType(String recordType) {
        this.recordType = recordType;
        }


    @Override
    public boolean equals(java.lang.Object o) {
    if (this == o) {
    return true;
    }
    if (o == null || getClass() != o.getClass()) {
    return false;
    }
        Selection selection = (Selection) o;
        return Objects.equals(this.id, selection.id) &&
        Objects.equals(this.name, selection.name) &&
        Objects.equals(this.owner, selection.owner) &&
        Objects.equals(this.tags, selection.tags) &&
        Objects.equals(this.recordType, selection.recordType);
    }

    @Override
    public int hashCode() {
    return Objects.hash(id, name, owner, tags, recordType);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("class Selection {\n");

sb.append("    id: ").append(toIndentedString(id)).append("\n");
sb.append("    name: ").append(toIndentedString(name)).append("\n");
sb.append("    owner: ").append(toIndentedString(owner)).append("\n");
sb.append("    tags: ").append(toIndentedString(tags)).append("\n");
sb.append("    recordType: ").append(toIndentedString(recordType)).append("\n");
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
