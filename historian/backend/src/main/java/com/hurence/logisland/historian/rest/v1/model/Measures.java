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

import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;
import org.threeten.bp.format.DateTimeFormatter;
import org.threeten.bp.OffsetDateTime;

/**
* holds a double array of values for a Tag between start &amp; stop
*/
    @ApiModel(description = "holds a double array of values for a Tag between start & stop")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-07-24T21:20:56.826+02:00")


@SolrDocument(solrCoreName = "historian")
public class Measures  implements Serializable {
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

        @JsonProperty("num_chunks")
        @Indexed(name = "num_chunks")
        private Long numChunks = null;

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

        public Measures name(String name) {
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

        public Measures setName(String name) {
        this.name = name;
        return this;
        }

        public Measures start(Long start) {
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

        public Measures setStart(Long start) {
        this.start = start;
        return this;
        }

        public Measures end(Long end) {
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

        public Measures setEnd(Long end) {
        this.end = end;
        return this;
        }

        public Measures queryDuration(Long queryDuration) {
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

        public Measures setQueryDuration(Long queryDuration) {
        this.queryDuration = queryDuration;
        return this;
        }

        public Measures quality(Double quality) {
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

        public Measures setQuality(Double quality) {
        this.quality = quality;
        return this;
        }

        public Measures numChunks(Long numChunks) {
        this.numChunks = numChunks;
        return this;
        }

    /**
        * Get numChunks
    * @return numChunks
    **/
        @JsonProperty("num_chunks")
    @ApiModelProperty(value = "")
    

  public Long getNumChunks() {
    return numChunks;
    }

        public Measures setNumChunks(Long numChunks) {
        this.numChunks = numChunks;
        return this;
        }

        public Measures numPoints(Integer numPoints) {
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

        public Measures setNumPoints(Integer numPoints) {
        this.numPoints = numPoints;
        return this;
        }

        public Measures timestamps(List<Long> timestamps) {
        this.timestamps = timestamps;
        return this;
        }

            public Measures addTimestampsItem(Long timestampsItem) {
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

        public Measures setTimestamps(List<Long> timestamps) {
        this.timestamps = timestamps;
        return this;
        }

        public Measures values(List<Double> values) {
        this.values = values;
        return this;
        }

            public Measures addValuesItem(Double valuesItem) {
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

        public Measures setValues(List<Double> values) {
        this.values = values;
        return this;
        }

        public Measures functions(List<Function> functions) {
        this.functions = functions;
        return this;
        }

            public Measures addFunctionsItem(Function functionsItem) {
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

        public Measures setFunctions(List<Function> functions) {
        this.functions = functions;
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
        Measures measures = (Measures) o;
        return Objects.equals(this.name, measures.name) &&
        Objects.equals(this.start, measures.start) &&
        Objects.equals(this.end, measures.end) &&
        Objects.equals(this.queryDuration, measures.queryDuration) &&
        Objects.equals(this.quality, measures.quality) &&
        Objects.equals(this.numChunks, measures.numChunks) &&
        Objects.equals(this.numPoints, measures.numPoints) &&
        Objects.equals(this.timestamps, measures.timestamps) &&
        Objects.equals(this.values, measures.values) &&
        Objects.equals(this.functions, measures.functions);
    }

    @Override
    public int hashCode() {
    return Objects.hash(name, start, end, queryDuration, quality, numChunks, numPoints, timestamps, values, functions);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    name: ").append(toIndentedString(name)).append("\n");
sb.append("    start: ").append(toIndentedString(start)).append("\n");
sb.append("    end: ").append(toIndentedString(end)).append("\n");
sb.append("    queryDuration: ").append(toIndentedString(queryDuration)).append("\n");
sb.append("    quality: ").append(toIndentedString(quality)).append("\n");
sb.append("    numChunks: ").append(toIndentedString(numChunks)).append("\n");
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
    if (o instanceof OffsetDateTime) {
        return ((OffsetDateTime) o).format(DateTimeFormatter.ISO_INSTANT);
    }
        return o.toString().replace("\n", "\n    ");
    }
}
