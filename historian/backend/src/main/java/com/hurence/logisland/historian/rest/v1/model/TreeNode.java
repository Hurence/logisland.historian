package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.hurence.logisland.historian.rest.v1.model.TreeNode;
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
* TreeNode
*/
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-07-16T17:43:03.007+02:00")


@SolrDocument(solrCoreName = "historian")
public class TreeNode  implements Serializable {
        @JsonProperty("value")
        @Indexed(name = "value")
        private String value = null;

        @JsonProperty("totalChildNumber")
        @Indexed(name = "totalChildNumber")
        private Long totalChildNumber = null;

        @JsonProperty("children")
        @Indexed(name = "children")
        private List<TreeNode> children = new ArrayList<TreeNode>();

        public TreeNode value(String value) {
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

        public TreeNode setValue(String value) {
        this.value = value;
        return this;
        }

        public TreeNode totalChildNumber(Long totalChildNumber) {
        this.totalChildNumber = totalChildNumber;
        return this;
        }

    /**
        * Get totalChildNumber
    * @return totalChildNumber
    **/
        @JsonProperty("totalChildNumber")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public Long getTotalChildNumber() {
    return totalChildNumber;
    }

        public TreeNode setTotalChildNumber(Long totalChildNumber) {
        this.totalChildNumber = totalChildNumber;
        return this;
        }

        public TreeNode children(List<TreeNode> children) {
        this.children = children;
        return this;
        }

            public TreeNode addChildrenItem(TreeNode childrenItem) {
            this.children.add(childrenItem);
            return this;
            }

    /**
        * Get children
    * @return children
    **/
        @JsonProperty("children")
    @ApiModelProperty(required = true, value = "")
      @NotNull

  @Valid

  public List<TreeNode> getChildren() {
    return children;
    }

        public TreeNode setChildren(List<TreeNode> children) {
        this.children = children;
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
        TreeNode treeNode = (TreeNode) o;
        return Objects.equals(this.value, treeNode.value) &&
        Objects.equals(this.totalChildNumber, treeNode.totalChildNumber) &&
        Objects.equals(this.children, treeNode.children);
    }

    @Override
    public int hashCode() {
    return Objects.hash(value, totalChildNumber, children);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("class TreeNode {\n");

sb.append("    value: ").append(toIndentedString(value)).append("\n");
sb.append("    totalChildNumber: ").append(toIndentedString(totalChildNumber)).append("\n");
sb.append("    children: ").append(toIndentedString(children)).append("\n");
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
