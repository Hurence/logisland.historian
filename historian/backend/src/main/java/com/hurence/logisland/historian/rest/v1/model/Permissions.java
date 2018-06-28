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
* a Permissions can allow to share something with others. It describes permission for one item.
*/
    @ApiModel(description = "a Permissions can allow to share something with others. It describes permission for one item.")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-06-26T15:57:01.504+02:00")

@SolrDocument(solrCoreName = "historian")
public class Permissions  implements Serializable {
        @JsonProperty("ownerSharing")
        @Indexed(name = "ownerSharing")
        private List<String> ownerSharing = null;

        @JsonProperty("roleSharing")
        @Indexed(name = "roleSharing")
        private List<String> roleSharing = null;

        public Permissions ownerSharing(List<String> ownerSharing) {
        this.ownerSharing = ownerSharing;
        return this;
        }

            public Permissions addOwnerSharingItem(String ownerSharingItem) {
                if (this.ownerSharing == null) {
                this.ownerSharing = new ArrayList<String>();
                }
            this.ownerSharing.add(ownerSharingItem);
            return this;
            }

    /**
        * list of users name whose allowed.
    * @return ownerSharing
    **/
        @JsonProperty("ownerSharing")
    @ApiModelProperty(value = "list of users name whose allowed.")
    

  public List<String> getOwnerSharing() {
    return ownerSharing;
    }

        public void setOwnerSharing(List<String> ownerSharing) {
        this.ownerSharing = ownerSharing;
        }

        public Permissions roleSharing(List<String> roleSharing) {
        this.roleSharing = roleSharing;
        return this;
        }

            public Permissions addRoleSharingItem(String roleSharingItem) {
                if (this.roleSharing == null) {
                this.roleSharing = new ArrayList<String>();
                }
            this.roleSharing.add(roleSharingItem);
            return this;
            }

    /**
        * list of roles whose allowed.
    * @return roleSharing
    **/
        @JsonProperty("roleSharing")
    @ApiModelProperty(value = "list of roles whose allowed.")
    

  public List<String> getRoleSharing() {
    return roleSharing;
    }

        public void setRoleSharing(List<String> roleSharing) {
        this.roleSharing = roleSharing;
        }


    @Override
    public boolean equals(java.lang.Object o) {
    if (this == o) {
    return true;
    }
    if (o == null || getClass() != o.getClass()) {
    return false;
    }
        Permissions permissions = (Permissions) o;
        return Objects.equals(this.ownerSharing, permissions.ownerSharing) &&
        Objects.equals(this.roleSharing, permissions.roleSharing);
    }

    @Override
    public int hashCode() {
    return Objects.hash(ownerSharing, roleSharing);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("class Permissions {\n");

sb.append("    ownerSharing: ").append(toIndentedString(ownerSharing)).append("\n");
sb.append("    roleSharing: ").append(toIndentedString(roleSharing)).append("\n");
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
