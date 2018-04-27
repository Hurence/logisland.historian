package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.hurence.logisland.historian.rest.v1.model.Function;
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
* holds a double array of values for a Tag between start &amp; stop
*/
    @ApiModel(description = "holds a double array of values for a Tag between start & stop")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-04-27T16:08:38.689+02:00")

@SolrDocument(solrCoreName = "historian")
public class Mesures  implements Serializable {
        @JsonProperty("name")
        @Indexed(name = "name")
        private String name = null;

        @JsonProperty("start")
        @Indexed(name = "start")
        private Long start = null;

        @JsonProperty("end")
        @Indexed(name = "end")
        private Long end = null;

        @JsonProperty("query_duration")
        @Indexed(name = "query_duration")
        private Long queryDuration = null;

        @JsonProperty("quality")
        @Indexed(name = "quality")
        private Double quality = null;

        @JsonProperty("num_points")
        @Indexed(name = "num_points")
        private Integer numPoints = null;

        @JsonProperty("timestamps")
        @Indexed(name = "timestamps")
        private List<Long> timestamps = null;

        @JsonProperty("values")
        @Indexed(name = "values")
        private List<Double> values = null;

        @JsonProperty("functions")
        @Indexed(name = "functions")
        private List<Function> functions = null;

        public Mesures name(String name) {
        this.name = name;
        return this;
        }

    /**
        * Get name
    * @return name
    **/
        @JsonProperty("name")
    @ApiModelProperty(value = "")
    

  public String getName() {
    return name;
    }

        public void setName(String name) {
        this.name = name;
        }

        public Mesures start(Long start) {
        this.start = start;
        return this;
        }

    /**
        * Get start
    * @return start
    **/
        @JsonProperty("start")
    @ApiModelProperty(value = "")
    

  public Long getStart() {
    return start;
    }

        public void setStart(Long start) {
        this.start = start;
        }

        public Mesures end(Long end) {
        this.end = end;
        return this;
        }

    /**
        * Get end
    * @return end
    **/
        @JsonProperty("end")
    @ApiModelProperty(value = "")
    

  public Long getEnd() {
    return end;
    }

        public void setEnd(Long end) {
        this.end = end;
        }

        public Mesures queryDuration(Long queryDuration) {
        this.queryDuration = queryDuration;
        return this;
        }

    /**
        * Get queryDuration
    * @return queryDuration
    **/
        @JsonProperty("query_duration")
    @ApiModelProperty(value = "")
    

  public Long getQueryDuration() {
    return queryDuration;
    }

        public void setQueryDuration(Long queryDuration) {
        this.queryDuration = queryDuration;
        }

        public Mesures quality(Double quality) {
        this.quality = quality;
        return this;
        }

    /**
        * Get quality
    * @return quality
    **/
        @JsonProperty("quality")
    @ApiModelProperty(value = "")
    

  public Double getQuality() {
    return quality;
    }

        public void setQuality(Double quality) {
        this.quality = quality;
        }

        public Mesures numPoints(Integer numPoints) {
        this.numPoints = numPoints;
        return this;
        }

    /**
        * Get numPoints
    * @return numPoints
    **/
        @JsonProperty("num_points")
    @ApiModelProperty(value = "")
    

  public Integer getNumPoints() {
    return numPoints;
    }

        public void setNumPoints(Integer numPoints) {
        this.numPoints = numPoints;
        }

        public Mesures timestamps(List<Long> timestamps) {
        this.timestamps = timestamps;
        return this;
        }

            public Mesures addTimestampsItem(Long timestampsItem) {
                if (this.timestamps == null) {
                this.timestamps = new ArrayList<Long>();
                }
            this.timestamps.add(timestampsItem);
            return this;
            }

    /**
        * Get timestamps
    * @return timestamps
    **/
        @JsonProperty("timestamps")
    @ApiModelProperty(value = "")
    

  public List<Long> getTimestamps() {
    return timestamps;
    }

        public void setTimestamps(List<Long> timestamps) {
        this.timestamps = timestamps;
        }

        public Mesures values(List<Double> values) {
        this.values = values;
        return this;
        }

            public Mesures addValuesItem(Double valuesItem) {
                if (this.values == null) {
                this.values = new ArrayList<Double>();
                }
            this.values.add(valuesItem);
            return this;
            }

    /**
        * Get values
    * @return values
    **/
        @JsonProperty("values")
    @ApiModelProperty(value = "")
    

  public List<Double> getValues() {
    return values;
    }

        public void setValues(List<Double> values) {
        this.values = values;
        }

        public Mesures functions(List<Function> functions) {
        this.functions = functions;
        return this;
        }

            public Mesures addFunctionsItem(Function functionsItem) {
                if (this.functions == null) {
                this.functions = new ArrayList<Function>();
                }
            this.functions.add(functionsItem);
            return this;
            }

    /**
        * Get functions
    * @return functions
    **/
        @JsonProperty("functions")
    @ApiModelProperty(value = "")
    
  @Valid

  public List<Function> getFunctions() {
    return functions;
    }

        public void setFunctions(List<Function> functions) {
        this.functions = functions;
        }


    @Override
    public boolean equals(java.lang.Object o) {
    if (this == o) {
    return true;
    }
    if (o == null || getClass() != o.getClass()) {
    return false;
    }
        Mesures mesures = (Mesures) o;
        return Objects.equals(this.name, mesures.name) &&
        Objects.equals(this.start, mesures.start) &&
        Objects.equals(this.end, mesures.end) &&
        Objects.equals(this.queryDuration, mesures.queryDuration) &&
        Objects.equals(this.quality, mesures.quality) &&
        Objects.equals(this.numPoints, mesures.numPoints) &&
        Objects.equals(this.timestamps, mesures.timestamps) &&
        Objects.equals(this.values, mesures.values) &&
        Objects.equals(this.functions, mesures.functions);
    }

    @Override
    public int hashCode() {
    return Objects.hash(name, start, end, queryDuration, quality, numPoints, timestamps, values, functions);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("class Mesures {\n");

sb.append("    name: ").append(toIndentedString(name)).append("\n");
sb.append("    start: ").append(toIndentedString(start)).append("\n");
sb.append("    end: ").append(toIndentedString(end)).append("\n");
sb.append("    queryDuration: ").append(toIndentedString(queryDuration)).append("\n");
sb.append("    quality: ").append(toIndentedString(quality)).append("\n");
sb.append("    numPoints: ").append(toIndentedString(numPoints)).append("\n");
sb.append("    timestamps: ").append(toIndentedString(timestamps)).append("\n");
sb.append("    values: ").append(toIndentedString(values)).append("\n");
sb.append("    functions: ").append(toIndentedString(functions)).append("\n");
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
