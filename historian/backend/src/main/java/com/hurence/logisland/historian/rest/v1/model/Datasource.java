package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.Serializable;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;
import org.threeten.bp.format.DateTimeFormatter;
import org.threeten.bp.OffsetDateTime;

/**
* Datasource
*/

@SolrDocument(solrCoreName = "datasource")
public class Datasource  implements Serializable {
        @JsonProperty("id")
        @Indexed(name = "id")
        private String id = null;

        @JsonProperty("description")
        @Indexed(name = "description")
        private String description = null;

        @JsonProperty("clsid")
        @Indexed(name = "clsid")
        private String clsid = null;

              /**
   * Gets or Sets datasourceType
   */
  public enum DatasourceTypeEnum {
    OPC_DA("OPC-DA"),
    
    OPC_UA("OPC-UA"),
    
    UNKNOWN("UNKNOWN");

    private String value;

    DatasourceTypeEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static DatasourceTypeEnum fromValue(String text) {
      for (DatasourceTypeEnum b : DatasourceTypeEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

        @JsonProperty("datasource_type")
        @Indexed(name = "datasource_type")
        private DatasourceTypeEnum datasourceType = DatasourceTypeEnum.OPC_UA;

        @JsonProperty("prog_id")
        @Indexed(name = "prog_id")
        private String progId = null;

        @JsonProperty("host")
        @Indexed(name = "host")
        private String host = null;

        @JsonProperty("domain")
        @Indexed(name = "domain")
        private String domain = null;

        @JsonProperty("user")
        @Indexed(name = "user")
        private String user = null;

        @JsonProperty("password")
        @Indexed(name = "password")
        private String password = null;

              /**
   * Gets or Sets tagBrowsing
   */
  public enum TagBrowsingEnum {
    AUTOMATIC("automatic"),
    
    MANUAL("manual");

    private String value;

    TagBrowsingEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static TagBrowsingEnum fromValue(String text) {
      for (TagBrowsingEnum b : TagBrowsingEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

        @JsonProperty("tag_browsing")
        @Indexed(name = "tag_browsing")
        private TagBrowsingEnum tagBrowsing = TagBrowsingEnum.AUTOMATIC;

        public Datasource id(String id) {
        this.id = id;
        return this;
        }

    /**
        * Get id
    * @return id
    **/
        @JsonProperty("id")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public String getId() {
    return id;
    }

        public Datasource setId(String id) {
        this.id = id;
        return this;
        }

        public Datasource description(String description) {
        this.description = description;
        return this;
        }

    /**
        * Get description
    * @return description
    **/
        @JsonProperty("description")
    @ApiModelProperty(value = "")
    

  public String getDescription() {
    return description;
    }

        public Datasource setDescription(String description) {
        this.description = description;
        return this;
        }

        public Datasource clsid(String clsid) {
        this.clsid = clsid;
        return this;
        }

    /**
        * Get clsid
    * @return clsid
    **/
        @JsonProperty("clsid")
    @ApiModelProperty(value = "")
    

  public String getClsid() {
    return clsid;
    }

        public Datasource setClsid(String clsid) {
        this.clsid = clsid;
        return this;
        }

        public Datasource datasourceType(DatasourceTypeEnum datasourceType) {
        this.datasourceType = datasourceType;
        return this;
        }

    /**
        * Get datasourceType
    * @return datasourceType
    **/
        @JsonProperty("datasource_type")
    @ApiModelProperty(value = "")
    

  public DatasourceTypeEnum getDatasourceType() {
    return datasourceType;
    }

        public Datasource setDatasourceType(DatasourceTypeEnum datasourceType) {
        this.datasourceType = datasourceType;
        return this;
        }

        public Datasource progId(String progId) {
        this.progId = progId;
        return this;
        }

    /**
        * Get progId
    * @return progId
    **/
        @JsonProperty("prog_id")
    @ApiModelProperty(value = "")
    

  public String getProgId() {
    return progId;
    }

        public Datasource setProgId(String progId) {
        this.progId = progId;
        return this;
        }

        public Datasource host(String host) {
        this.host = host;
        return this;
        }

    /**
        * Get host
    * @return host
    **/
        @JsonProperty("host")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public String getHost() {
    return host;
    }

        public Datasource setHost(String host) {
        this.host = host;
        return this;
        }

        public Datasource domain(String domain) {
        this.domain = domain;
        return this;
        }

    /**
        * Get domain
    * @return domain
    **/
        @JsonProperty("domain")
    @ApiModelProperty(value = "")
    

  public String getDomain() {
    return domain;
    }

        public Datasource setDomain(String domain) {
        this.domain = domain;
        return this;
        }

        public Datasource user(String user) {
        this.user = user;
        return this;
        }

    /**
        * Get user
    * @return user
    **/
        @JsonProperty("user")
    @ApiModelProperty(value = "")
    

  public String getUser() {
    return user;
    }

        public Datasource setUser(String user) {
        this.user = user;
        return this;
        }

        public Datasource password(String password) {
        this.password = password;
        return this;
        }

    /**
        * Get password
    * @return password
    **/
        @JsonProperty("password")
    @ApiModelProperty(value = "")
    

  public String getPassword() {
    return password;
    }

        public Datasource setPassword(String password) {
        this.password = password;
        return this;
        }

        public Datasource tagBrowsing(TagBrowsingEnum tagBrowsing) {
        this.tagBrowsing = tagBrowsing;
        return this;
        }

    /**
        * Get tagBrowsing
    * @return tagBrowsing
    **/
        @JsonProperty("tag_browsing")
    @ApiModelProperty(value = "")
    

  public TagBrowsingEnum getTagBrowsing() {
    return tagBrowsing;
    }

        public Datasource setTagBrowsing(TagBrowsingEnum tagBrowsing) {
        this.tagBrowsing = tagBrowsing;
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
        Datasource datasource = (Datasource) o;
        return Objects.equals(this.id, datasource.id) &&
        Objects.equals(this.description, datasource.description) &&
        Objects.equals(this.clsid, datasource.clsid) &&
        Objects.equals(this.datasourceType, datasource.datasourceType) &&
        Objects.equals(this.progId, datasource.progId) &&
        Objects.equals(this.host, datasource.host) &&
        Objects.equals(this.domain, datasource.domain) &&
        Objects.equals(this.user, datasource.user) &&
        Objects.equals(this.password, datasource.password) &&
        Objects.equals(this.tagBrowsing, datasource.tagBrowsing);
    }

    @Override
    public int hashCode() {
    return Objects.hash(id, description, clsid, datasourceType, progId, host, domain, user, password, tagBrowsing);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    id: ").append(toIndentedString(id)).append("\n");
sb.append("    description: ").append(toIndentedString(description)).append("\n");
sb.append("    clsid: ").append(toIndentedString(clsid)).append("\n");
sb.append("    datasourceType: ").append(toIndentedString(datasourceType)).append("\n");
sb.append("    progId: ").append(toIndentedString(progId)).append("\n");
sb.append("    host: ").append(toIndentedString(host)).append("\n");
sb.append("    domain: ").append(toIndentedString(domain)).append("\n");
sb.append("    user: ").append(toIndentedString(user)).append("\n");
sb.append("    password: ").append(toIndentedString(password)).append("\n");
sb.append("    tagBrowsing: ").append(toIndentedString(tagBrowsing)).append("\n");
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
