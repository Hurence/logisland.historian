package com.hurence.logisland.historian.rest.v1.model.dashboard;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hurence.logisland.historian.rest.v1.model.Permissions;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;
import org.threeten.bp.OffsetDateTime;
import org.threeten.bp.format.DateTimeFormatter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

@SolrDocument(solrCoreName = "dashboard")
public class DashboardJson implements Serializable {
    @JsonProperty("id")
    @Indexed(name = "id")
    private String id = null;

    @JsonProperty("name")
    @Indexed(name = "name")
    private String name = null;

    @JsonProperty("owner")
    @Indexed(name = "owner")
    private String owner = null;

    @JsonProperty("description")
    @Indexed(name = "description")
    private String description = null;

    @JsonProperty("permissions")
    @Indexed(name = "permissions")
    private Permissions permissions = null;

    @JsonProperty("from")
    @Indexed(name = "from")
    private String from = null;

    @JsonProperty("to")
    @Indexed(name = "to")
    private String to = null;

    @JsonProperty("autorefresh")
    @Indexed(name = "autorefresh")
    private Long autorefresh = null;

    @JsonProperty("panels")
    @Indexed(name = "panels")
    private String panels = null;

    /**
     * UUID of the DashboardJson.
     * @return id
     **/
    @JsonProperty("id")
    @ApiModelProperty(required = true, value = "UUID of the DashboardJson.")
    @NotNull

    public DashboardJson id(String uid) {
        this.id = uid;
        return this;
    }

    public String getId() {
        return id;
    }

    public DashboardJson name(String name) {
        this.name = name;
        return this;
    }

    /**
     * Name of the DashboardJson.
     * @return name
     **/
    @JsonProperty("name")
    @ApiModelProperty(required = true, value = "Name of the DashboardJson.")
    @NotNull


    public String getName() {
        return name;
    }

    public DashboardJson setName(String name) {
        this.name = name;
        return this;
    }

    public DashboardJson owner(String owner) {
        this.owner = owner;
        return this;
    }

    /**
     * creator of the DashboardJson.
     * @return owner
     **/
    @JsonProperty("owner")
    @ApiModelProperty(required = true, value = "creator of the DashboardJson.")
    @NotNull


    public String getOwner() {
        return owner;
    }

    public DashboardJson setOwner(String owner) {
        this.owner = owner;
        return this;
    }

    public DashboardJson description(String description) {
        this.description = description;
        return this;
    }

    /**
     * description for this DashboardJson.
     * @return description
     **/
    @JsonProperty("description")
    @ApiModelProperty(value = "description for this DashboardJson.")


    public String getDescription() {
        return description;
    }

    public DashboardJson setDescription(String description) {
        this.description = description;
        return this;
    }

    public DashboardJson permissions(Permissions permissions) {
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

    public DashboardJson setPermissions(Permissions permissions) {
        this.permissions = permissions;
        return this;
    }

    public DashboardJson from(String from) {
        this.from = from;
        return this;
    }

    /**
     * The start time for searching data.
     * @return from
     **/
    @JsonProperty("from")
    @ApiModelProperty(value = "The start time for searching data.")


    public String getFrom() {
        return from;
    }

    public DashboardJson setFrom(String from) {
        this.from = from;
        return this;
    }

    public DashboardJson to(String to) {
        this.to = to;
        return this;
    }

    /**
     * The end time from searching data.
     * @return to
     **/
    @JsonProperty("to")
    @ApiModelProperty(value = "The end time from searching data.")


    public String getTo() {
        return to;
    }

    public DashboardJson setTo(String to) {
        this.to = to;
        return this;
    }

    public DashboardJson autorefresh(Long autorefresh) {
        this.autorefresh = autorefresh;
        return this;
    }

    /**
     * The number of milliseconds between each refresh of data.
     * @return autorefresh
     **/
    @JsonProperty("autorefresh")
    @ApiModelProperty(value = "The number of milliseconds between each refresh of data.")


    public Long getAutorefresh() {
        return autorefresh;
    }

    public DashboardJson setAutorefresh(Long autorefresh) {
        this.autorefresh = autorefresh;
        return this;
    }

    public DashboardJson panels(String panels) {
        this.panels = panels;
        return this;
    }

    /**
     * list of panels in DashboardJson.
     * @return panels
     **/
    @JsonProperty("panels")
    @ApiModelProperty(value = "list of panels in DashboardJson.")
    @Valid

    public String getPanels() {
        return panels;
    }

    public DashboardJson setPanels(String panels) {
        this.panels = panels;
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
        DashboardJson DashboardJson = (DashboardJson) o;
        return Objects.equals(this.id, DashboardJson.id) &&
                Objects.equals(this.name, DashboardJson.name) &&
                Objects.equals(this.owner, DashboardJson.owner) &&
                Objects.equals(this.description, DashboardJson.description) &&
                Objects.equals(this.permissions, DashboardJson.permissions) &&
                Objects.equals(this.from, DashboardJson.from) &&
                Objects.equals(this.to, DashboardJson.to) &&
                Objects.equals(this.autorefresh, DashboardJson.autorefresh) &&
                Objects.equals(this.panels, DashboardJson.panels);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, owner, description, permissions, from, to, autorefresh, panels);
    }


    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("{\n");

        sb.append("    id: ").append(toIndentedString(id)).append("\n");
        sb.append("    name: ").append(toIndentedString(name)).append("\n");
        sb.append("    owner: ").append(toIndentedString(owner)).append("\n");
        sb.append("    description: ").append(toIndentedString(description)).append("\n");
        sb.append("    permissions: ").append(toIndentedString(permissions)).append("\n");
        sb.append("    from: ").append(toIndentedString(from)).append("\n");
        sb.append("    to: ").append(toIndentedString(to)).append("\n");
        sb.append("    autorefresh: ").append(toIndentedString(autorefresh)).append("\n");
        sb.append("    panels: ").append(toIndentedString(panels)).append("\n");
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

