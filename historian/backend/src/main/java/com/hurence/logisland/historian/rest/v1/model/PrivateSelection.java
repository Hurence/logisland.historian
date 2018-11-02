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

import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;
import org.threeten.bp.format.DateTimeFormatter;
import org.threeten.bp.OffsetDateTime;

/**
* PrivateSelection
*/

@SolrDocument(solrCoreName = "selection")
public class PrivateSelection  extends Selection implements Serializable {

    @JsonProperty("id")
    @Indexed(name = "id")
    private String id = null;

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

    public PrivateSelection setId(String id) {
        this.id = id;
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
        PrivateSelection privateSelection = (PrivateSelection) o;
        return Objects.equals(this.getName(), privateSelection.getName()) &&
        Objects.equals(this.getDescription(), privateSelection.getDescription()) &&
        Objects.equals(this.getOwner(), privateSelection.getOwner()) &&
        Objects.equals(this.getPermissions(), privateSelection.getPermissions()) &&
        Objects.equals(this.getTagIds(), privateSelection.getTagIds()) &&
        Objects.equals(this.getId(), privateSelection.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.getName(), this.getDescription(),
                this.getOwner(), this.getPermissions(), this.getTagIds(), id);
    }


    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("{\n");

        sb.append("    name: ").append(toIndentedString(this.getName())).append("\n");
        sb.append("    description: ").append(toIndentedString(this.getDescription())).append("\n");
        sb.append("    owner: ").append(toIndentedString(this.getOwner())).append("\n");
        sb.append("    permissions: ").append(toIndentedString(this.getPermissions())).append("\n");
        sb.append("    tagIds: ").append(toIndentedString(this.getTagIds())).append("\n");
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
        if (o instanceof OffsetDateTime) {
            return ((OffsetDateTime) o).format(DateTimeFormatter.ISO_INSTANT);
        }
        return o.toString().replace("\n", "\n    ");
    }
}
