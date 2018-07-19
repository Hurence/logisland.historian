package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.hurence.logisland.historian.rest.v1.model.Permissions;
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
* a Selection is a selection of tags.
*/
    @ApiModel(description = "a Selection is a selection of tags.")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-07-18T17:02:10.968+02:00")


@SolrDocument(solrCoreName = "historian")
public class Selection  implements Serializable {
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

        public Selection setName(String name) {
        this.name = name;
        return this;
        }

        public Selection description(String description) {
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

        public Selection setDescription(String description) {
        this.description = description;
        return this;
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
    @ApiModelProperty(value = "")
    

  public String getOwner() {
    return owner;
    }

        public Selection setOwner(String owner) {
        this.owner = owner;
        return this;
        }

        public Selection permissions(Permissions permissions) {
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

        public Selection setPermissions(Permissions permissions) {
        this.permissions = permissions;
        return this;
        }

        public Selection tagIds(List<String> tagIds) {
        this.tagIds = tagIds;
        return this;
        }

            public Selection addTagIdsItem(String tagIdsItem) {
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

        public Selection setTagIds(List<String> tagIds) {
        this.tagIds = tagIds;
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
        Selection selection = (Selection) o;
        return Objects.equals(this.name, selection.name) &&
        Objects.equals(this.description, selection.description) &&
        Objects.equals(this.owner, selection.owner) &&
        Objects.equals(this.permissions, selection.permissions) &&
        Objects.equals(this.tagIds, selection.tagIds);
    }

    @Override
    public int hashCode() {
    return Objects.hash(name, description, owner, permissions, tagIds);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    name: ").append(toIndentedString(name)).append("\n");
sb.append("    description: ").append(toIndentedString(description)).append("\n");
sb.append("    owner: ").append(toIndentedString(owner)).append("\n");
sb.append("    permissions: ").append(toIndentedString(permissions)).append("\n");
sb.append("    tagIds: ").append(toIndentedString(tagIds)).append("\n");
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
