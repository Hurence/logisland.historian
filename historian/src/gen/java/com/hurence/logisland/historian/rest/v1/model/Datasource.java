/*
 * Logisland Data Historian
 * REST API for logisland historian
 *
 * OpenAPI spec version: v1
 * Contact: support@hurence.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.Serializable;
import javax.validation.constraints.*;


import org.springframework.data.annotation.Id;
import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;

/**
* Datasource
*/
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-04-16T16:36:23.971+02:00")
@SolrDocument(solrCoreName = "historian")
public class Datasource  implements Serializable {
        @JsonProperty("id")
        @Indexed(name = "id", type = "String")
        private String id = null;

        @JsonProperty("description")
        @Indexed(name = "description", type = "String")
        private String description = null;

        @JsonProperty("clsid")
        @Indexed(name = "clsid", type = "String")
        private String clsid = null;

        @JsonProperty("host")
        @Indexed(name = "host", type = "String")
        private String host = null;

        @JsonProperty("domain")
        @Indexed(name = "domain", type = "String")
        private String domain = null;

        @JsonProperty("user")
        @Indexed(name = "user", type = "String")
        private String user = null;

        @JsonProperty("password")
        @Indexed(name = "password", type = "String")
        private String password = null;

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

        public void setId(String id) {
        this.id = id;
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

        public void setDescription(String description) {
        this.description = description;
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

        public void setClsid(String clsid) {
        this.clsid = clsid;
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

        public void setHost(String host) {
        this.host = host;
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

        public void setDomain(String domain) {
        this.domain = domain;
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

        public void setUser(String user) {
        this.user = user;
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

        public void setPassword(String password) {
        this.password = password;
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
        Objects.equals(this.host, datasource.host) &&
        Objects.equals(this.domain, datasource.domain) &&
        Objects.equals(this.user, datasource.user) &&
        Objects.equals(this.password, datasource.password);
    }

    @Override
    public int hashCode() {
    return Objects.hash(id, description, clsid, host, domain, user, password);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("class Datasource {\n");

sb.append("    id: ").append(toIndentedString(id)).append("\n");
sb.append("    description: ").append(toIndentedString(description)).append("\n");
sb.append("    clsid: ").append(toIndentedString(clsid)).append("\n");
sb.append("    host: ").append(toIndentedString(host)).append("\n");
sb.append("    domain: ").append(toIndentedString(domain)).append("\n");
sb.append("    user: ").append(toIndentedString(user)).append("\n");
sb.append("    password: ").append(toIndentedString(password)).append("\n");
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
