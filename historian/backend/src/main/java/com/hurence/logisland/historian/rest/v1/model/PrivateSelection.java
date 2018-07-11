package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.hurence.logisland.historian.rest.v1.model.Permissions;
import com.hurence.logisland.historian.rest.v1.model.Selection;
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
* PrivateSelection
*/
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-07-12T10:58:05.350+02:00")

@SolrDocument(solrCoreName = "historian")
public class PrivateSelection  implements Serializable {
        @JsonProperty("name")
        @Indexed(name = "name")
        private String name = null;

        @JsonProperty("description")
        @Indexed(name = "description")
        private String description = null;

        @JsonProperty("owner")
        @Indexed(name = "owner")
        private String owner = null;

        @JsonProperty("permissions")
        @Indexed(name = "permissions")
        private Permissions permissions = null;

        @JsonProperty("tagIds")
        @Indexed(name = "tagIds")
        private List<String> tagIds = new ArrayList<String>();

        @JsonProperty("id")
        @Indexed(name = "id")
        private String id = null;

        @JsonProperty("record_type")
        @Indexed(name = "record_type")
        private String recordType = "selection";

        public PrivateSelection name(String name) {
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

        public PrivateSelection description(String description) {
        this.description = description;
        return this;
        }

    /**
        * description for this selection of tags
    * @return description
    **/
        @JsonProperty("description")
    @ApiModelProperty(value = "description for this selection of tags")
    

  public String getDescription() {
    return description;
    }

        public void setDescription(String description) {
        this.description = description;
        }

        public PrivateSelection owner(String owner) {
        this.owner = owner;
        return this;
        }

    /**
        * Get owner
    * @return owner
    **/
        @JsonProperty("owner")
    @ApiModelProperty(value = "")
    

  public String getOwner() {
    return owner;
    }

        public void setOwner(String owner) {
        this.owner = owner;
        }

        public PrivateSelection permissions(Permissions permissions) {
        this.permissions = permissions;
        return this;
        }

    /**
        * Get permissions
    * @return permissions
    **/
        @JsonProperty("permissions")
    @ApiModelProperty(value = "")
    
  @Valid

  public Permissions getPermissions() {
    return permissions;
    }

        public void setPermissions(Permissions permissions) {
        this.permissions = permissions;
        }

        public PrivateSelection tagIds(List<String> tagIds) {
        this.tagIds = tagIds;
        return this;
        }

            public PrivateSelection addTagIdsItem(String tagIdsItem) {
            this.tagIds.add(tagIdsItem);
            return this;
            }

    /**
        * list of tags id in selection
    * @return tagIds
    **/
        @JsonProperty("tagIds")
    @ApiModelProperty(required = true, value = "list of tags id in selection")
      @NotNull


  public List<String> getTagIds() {
    return tagIds;
    }

        public void setTagIds(List<String> tagIds) {
        this.tagIds = tagIds;
        }

        public PrivateSelection id(String id) {
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

        public PrivateSelection recordType(String recordType) {
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
        PrivateSelection privateSelection = (PrivateSelection) o;
        return Objects.equals(this.name, privateSelection.name) &&
        Objects.equals(this.description, privateSelection.description) &&
        Objects.equals(this.owner, privateSelection.owner) &&
        Objects.equals(this.permissions, privateSelection.permissions) &&
        Objects.equals(this.tagIds, privateSelection.tagIds) &&
        Objects.equals(this.id, privateSelection.id) &&
        Objects.equals(this.recordType, privateSelection.recordType);
    }

    @Override
    public int hashCode() {
    return Objects.hash(name, description, owner, permissions, tagIds, id, recordType);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("class PrivateSelection {\n");

sb.append("    name: ").append(toIndentedString(name)).append("\n");
sb.append("    description: ").append(toIndentedString(description)).append("\n");
sb.append("    owner: ").append(toIndentedString(owner)).append("\n");
sb.append("    permissions: ").append(toIndentedString(permissions)).append("\n");
sb.append("    tagIds: ").append(toIndentedString(tagIds)).append("\n");
sb.append("    id: ").append(toIndentedString(id)).append("\n");
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
