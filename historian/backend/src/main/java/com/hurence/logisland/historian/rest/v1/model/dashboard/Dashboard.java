package com.hurence.logisland.historian.rest.v1.model.dashboard;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.hurence.logisland.historian.rest.v1.model.Permissions;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.io.Serializable;
import javax.validation.Valid;
import javax.validation.constraints.*;

import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;
import org.threeten.bp.format.DateTimeFormatter;
import org.threeten.bp.OffsetDateTime;

/**
* A dashboard is representing different panels (as of today only gauges) with thei configuration. Those enable data visualization. 
*/
@ApiModel(description = "A dashboard is representing different panels (as of today only gauges) with thei configuration. Those enable data visualization. ")

@SolrDocument(solrCoreName = "dashboard")
public class Dashboard  implements Serializable {
        @JsonProperty("uid")
        @Indexed(name = "uid")
        private String uid = null;

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
        private List<Gauge> panels = null;

    /**
        * UUID of the dashboard.
    * @return uid
    **/
        @JsonProperty("uid")
    @ApiModelProperty(required = true, value = "UUID of the dashboard.")
      @NotNull

    public Dashboard uid(String uid) {
        this.uid = uid;
        return this;
    }

  public String getUid() {
    return uid;
    }

        public Dashboard name(String name) {
        this.name = name;
        return this;
        }

    /**
        * Name of the dashboard.
    * @return name
    **/
        @JsonProperty("name")
    @ApiModelProperty(required = true, value = "Name of the dashboard.")
      @NotNull


  public String getName() {
    return name;
    }

        public Dashboard setName(String name) {
        this.name = name;
        return this;
        }

        public Dashboard owner(String owner) {
        this.owner = owner;
        return this;
        }

    /**
        * creator of the dashboard.
    * @return owner
    **/
        @JsonProperty("owner")
    @ApiModelProperty(required = true, value = "creator of the dashboard.")
      @NotNull


  public String getOwner() {
    return owner;
    }

        public Dashboard setOwner(String owner) {
        this.owner = owner;
        return this;
        }

        public Dashboard description(String description) {
        this.description = description;
        return this;
        }

    /**
        * description for this dashboard.
    * @return description
    **/
        @JsonProperty("description")
    @ApiModelProperty(value = "description for this dashboard.")
    

  public String getDescription() {
    return description;
    }

        public Dashboard setDescription(String description) {
        this.description = description;
        return this;
        }

        public Dashboard permissions(Permissions permissions) {
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

        public Dashboard setPermissions(Permissions permissions) {
        this.permissions = permissions;
        return this;
        }

        public Dashboard from(String from) {
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

        public Dashboard setFrom(String from) {
        this.from = from;
        return this;
        }

        public Dashboard to(String to) {
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

        public Dashboard setTo(String to) {
        this.to = to;
        return this;
        }

        public Dashboard autorefresh(Long autorefresh) {
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

        public Dashboard setAutorefresh(Long autorefresh) {
        this.autorefresh = autorefresh;
        return this;
        }

        public Dashboard panels(List<Gauge> panels) {
        this.panels = panels;
        return this;
        }

            public Dashboard addPanelsItem(Gauge panelsItem) {
                if (this.panels == null) {
                this.panels = new ArrayList<Gauge>();
                }
            this.panels.add(panelsItem);
            return this;
            }

    /**
        * list of panels in dashboard.
    * @return panels
    **/
        @JsonProperty("panels")
    @ApiModelProperty(value = "list of panels in dashboard.")
    
  @Valid

  public List<Gauge> getPanels() {
    return panels;
    }

        public Dashboard setPanels(List<Gauge> panels) {
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
        Dashboard dashboard = (Dashboard) o;
        return Objects.equals(this.uid, dashboard.uid) &&
        Objects.equals(this.name, dashboard.name) &&
        Objects.equals(this.owner, dashboard.owner) &&
        Objects.equals(this.description, dashboard.description) &&
        Objects.equals(this.permissions, dashboard.permissions) &&
        Objects.equals(this.from, dashboard.from) &&
        Objects.equals(this.to, dashboard.to) &&
        Objects.equals(this.autorefresh, dashboard.autorefresh) &&
        Objects.equals(this.panels, dashboard.panels);
    }

    @Override
    public int hashCode() {
    return Objects.hash(uid, name, owner, description, permissions, from, to, autorefresh, panels);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    uid: ").append(toIndentedString(uid)).append("\n");
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
