package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
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
* contain request option for data of tag
*/
    @ApiModel(description = "contain request option for data of tag")

@SolrDocument(solrCoreName = "historian")
public class MeasuresRequest  implements Serializable {
        @JsonProperty("tagId")
        @Indexed(name = "tagId")
        private String tagId = null;

        @JsonProperty("start")
        @Indexed(name = "start")
        private String start = null;

        @JsonProperty("end")
        @Indexed(name = "end")
        private String end = null;

        @JsonProperty("function")
        @Indexed(name = "function")
        private String function = null;

        @JsonProperty("no_values")
        @Indexed(name = "no_values")
        private Boolean noValues = false;

        public MeasuresRequest tagId(String tagId) {
        this.tagId = tagId;
        return this;
        }

    /**
        * Get tagId
    * @return tagId
    **/
        @JsonProperty("tagId")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public String getTagId() {
    return tagId;
    }

        public MeasuresRequest setTagId(String tagId) {
        this.tagId = tagId;
        return this;
        }

        public MeasuresRequest start(String start) {
        this.start = start;
        return this;
        }

    /**
        * date de début (borne inf) peut-être exprimée sous les formats suivants :   timestamp : 4578965   date-time : 2015-11-25T12:06:57.330Z   relatif   : NOW-30DAYS 
    * @return start
    **/
        @JsonProperty("start")
    @ApiModelProperty(value = "date de début (borne inf) peut-être exprimée sous les formats suivants :   timestamp : 4578965   date-time : 2015-11-25T12:06:57.330Z   relatif   : NOW-30DAYS ")
    

  public String getStart() {
    return start;
    }

        public MeasuresRequest setStart(String start) {
        this.start = start;
        return this;
        }

        public MeasuresRequest end(String end) {
        this.end = end;
        return this;
        }

    /**
        * date de fin (borne sup) peut-être exprimée sous les formats suivants :   timestamp : 4578965   date-time : 2015-11-25T12:06:57.330Z   relatif   : NOW-30DAYS 
    * @return end
    **/
        @JsonProperty("end")
    @ApiModelProperty(value = "date de fin (borne sup) peut-être exprimée sous les formats suivants :   timestamp : 4578965   date-time : 2015-11-25T12:06:57.330Z   relatif   : NOW-30DAYS ")
    

  public String getEnd() {
    return end;
    }

        public MeasuresRequest setEnd(String end) {
        this.end = end;
        return this;
        }

        public MeasuresRequest function(String function) {
        this.function = function;
        return this;
        }

    /**
        * Multiple analyses, aggregations, and transformations are allowed per query. If so, Chronix will first execute the transformations in the order they occur. Then it executes the analyses and aggregations on the result of the chained transformations. For example the query:    max;min;trend;movavg:10,minutes;scale:4  is executed as follows:    Calculate the moving average   Scale the result of the moving average by 4   Calculate the max, min, and the trend based on the prior result. 
    * @return function
    **/
        @JsonProperty("function")
    @ApiModelProperty(value = "Multiple analyses, aggregations, and transformations are allowed per query. If so, Chronix will first execute the transformations in the order they occur. Then it executes the analyses and aggregations on the result of the chained transformations. For example the query:    max;min;trend;movavg:10,minutes;scale:4  is executed as follows:    Calculate the moving average   Scale the result of the moving average by 4   Calculate the max, min, and the trend based on the prior result. ")
    

  public String getFunction() {
    return function;
    }

        public MeasuresRequest setFunction(String function) {
        this.function = function;
        return this;
        }

        public MeasuresRequest noValues(Boolean noValues) {
        this.noValues = noValues;
        return this;
        }

    /**
        * will retrieve only function values, no data points
    * @return noValues
    **/
        @JsonProperty("no_values")
    @ApiModelProperty(value = "will retrieve only function values, no data points")
    

  public Boolean isNoValues() {
    return noValues;
    }

        public MeasuresRequest setNoValues(Boolean noValues) {
        this.noValues = noValues;
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
        MeasuresRequest measuresRequest = (MeasuresRequest) o;
        return Objects.equals(this.tagId, measuresRequest.tagId) &&
        Objects.equals(this.start, measuresRequest.start) &&
        Objects.equals(this.end, measuresRequest.end) &&
        Objects.equals(this.function, measuresRequest.function) &&
        Objects.equals(this.noValues, measuresRequest.noValues);
    }

    @Override
    public int hashCode() {
    return Objects.hash(tagId, start, end, function, noValues);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    tagId: ").append(toIndentedString(tagId)).append("\n");
sb.append("    start: ").append(toIndentedString(start)).append("\n");
sb.append("    end: ").append(toIndentedString(end)).append("\n");
sb.append("    function: ").append(toIndentedString(function)).append("\n");
sb.append("    noValues: ").append(toIndentedString(noValues)).append("\n");
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
