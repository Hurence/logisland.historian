package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.hurence.logisland.historian.rest.v1.model.Processor;
import com.hurence.logisland.historian.rest.v1.model.Property;
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
* a Pipeline is a sequence of Processor wich apply specifi business logic on current tag value (matching query for alerting for example)
*/
    @ApiModel(description = "a Pipeline is a sequence of Processor wich apply specifi business logic on current tag value (matching query for alerting for example)")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-19T12:25:30.271+02:00")

@SolrDocument(solrCoreName = "historian")
public class Pipeline  implements Serializable {
        @JsonProperty("record_type")
        @Indexed(name = "record_type")
        private String recordType = "pipeline";

        @JsonProperty("name")
        @Indexed(name = "name")
        private String name = null;

        @JsonProperty("component")
        @Indexed(name = "component")
        private String component = null;

        @JsonProperty("documentation")
        @Indexed(name = "documentation")
        private String documentation = null;

        @JsonProperty("config")
        @Indexed(name = "config")
        private List<Property> config = null;

        @JsonProperty("processors")
        @Indexed(name = "processors")
        private List<Processor> processors = null;

        public Pipeline recordType(String recordType) {
        this.recordType = recordType;
        return this;
        }

    /**
        * Get recordType
    * @return recordType
    **/
        @JsonProperty("record_type")
    @ApiModelProperty(value = "")
    

  public String getRecordType() {
    return recordType;
    }

        public void setRecordType(String recordType) {
        this.recordType = recordType;
        }

        public Pipeline name(String name) {
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

        public Pipeline component(String component) {
        this.component = component;
        return this;
        }

    /**
        * Get component
    * @return component
    **/
        @JsonProperty("component")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public String getComponent() {
    return component;
    }

        public void setComponent(String component) {
        this.component = component;
        }

        public Pipeline documentation(String documentation) {
        this.documentation = documentation;
        return this;
        }

    /**
        * Get documentation
    * @return documentation
    **/
        @JsonProperty("documentation")
    @ApiModelProperty(value = "")
    

  public String getDocumentation() {
    return documentation;
    }

        public void setDocumentation(String documentation) {
        this.documentation = documentation;
        }

        public Pipeline config(List<Property> config) {
        this.config = config;
        return this;
        }

            public Pipeline addConfigItem(Property configItem) {
                if (this.config == null) {
                this.config = new ArrayList<Property>();
                }
            this.config.add(configItem);
            return this;
            }

    /**
        * Get config
    * @return config
    **/
        @JsonProperty("config")
    @ApiModelProperty(value = "")
    
  @Valid

  public List<Property> getConfig() {
    return config;
    }

        public void setConfig(List<Property> config) {
        this.config = config;
        }

        public Pipeline processors(List<Processor> processors) {
        this.processors = processors;
        return this;
        }

            public Pipeline addProcessorsItem(Processor processorsItem) {
                if (this.processors == null) {
                this.processors = new ArrayList<Processor>();
                }
            this.processors.add(processorsItem);
            return this;
            }

    /**
        * Get processors
    * @return processors
    **/
        @JsonProperty("processors")
    @ApiModelProperty(value = "")
    
  @Valid

  public List<Processor> getProcessors() {
    return processors;
    }

        public void setProcessors(List<Processor> processors) {
        this.processors = processors;
        }


    @Override
    public boolean equals(java.lang.Object o) {
    if (this == o) {
    return true;
    }
    if (o == null || getClass() != o.getClass()) {
    return false;
    }
        Pipeline pipeline = (Pipeline) o;
        return Objects.equals(this.recordType, pipeline.recordType) &&
        Objects.equals(this.name, pipeline.name) &&
        Objects.equals(this.component, pipeline.component) &&
        Objects.equals(this.documentation, pipeline.documentation) &&
        Objects.equals(this.config, pipeline.config) &&
        Objects.equals(this.processors, pipeline.processors);
    }

    @Override
    public int hashCode() {
    return Objects.hash(recordType, name, component, documentation, config, processors);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("class Pipeline {\n");

sb.append("    recordType: ").append(toIndentedString(recordType)).append("\n");
sb.append("    name: ").append(toIndentedString(name)).append("\n");
sb.append("    component: ").append(toIndentedString(component)).append("\n");
sb.append("    documentation: ").append(toIndentedString(documentation)).append("\n");
sb.append("    config: ").append(toIndentedString(config)).append("\n");
sb.append("    processors: ").append(toIndentedString(processors)).append("\n");
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
