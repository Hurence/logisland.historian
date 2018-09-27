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

import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;
import org.threeten.bp.format.DateTimeFormatter;
import org.threeten.bp.OffsetDateTime;

/**
* BulkLoad
*/
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-09-27T15:16:49.275+02:00")


@SolrDocument(solrCoreName = "historian")
public class BulkLoad  implements Serializable {
        @JsonProperty("start_time")
        @Indexed(name = "start_time")
        private Long startTime = null;

        @JsonProperty("generation_duration")
        @Indexed(name = "generation_duration")
        private Integer generationDuration = 0;

        @JsonProperty("import_duration")
        @Indexed(name = "import_duration")
        private Integer importDuration = null;

        @JsonProperty("num_metrics_imported")
        @Indexed(name = "num_metrics_imported")
        private Integer numMetricsImported = null;

        @JsonProperty("num_points_imported")
        @Indexed(name = "num_points_imported")
        private Long numPointsImported = null;

        @JsonProperty("metrics")
        @Indexed(name = "metrics")
        private List<String> metrics = null;

        public BulkLoad startTime(Long startTime) {
        this.startTime = startTime;
        return this;
        }

    /**
        * timestamp
    * @return startTime
    **/
        @JsonProperty("start_time")
    @ApiModelProperty(value = "timestamp")
    

  public Long getStartTime() {
    return startTime;
    }

        public BulkLoad setStartTime(Long startTime) {
        this.startTime = startTime;
        return this;
        }

        public BulkLoad generationDuration(Integer generationDuration) {
        this.generationDuration = generationDuration;
        return this;
        }

    /**
        * Get generationDuration
    * @return generationDuration
    **/
        @JsonProperty("generation_duration")
    @ApiModelProperty(value = "")
    

  public Integer getGenerationDuration() {
    return generationDuration;
    }

        public BulkLoad setGenerationDuration(Integer generationDuration) {
        this.generationDuration = generationDuration;
        return this;
        }

        public BulkLoad importDuration(Integer importDuration) {
        this.importDuration = importDuration;
        return this;
        }

    /**
        * Get importDuration
    * @return importDuration
    **/
        @JsonProperty("import_duration")
    @ApiModelProperty(value = "")
    

  public Integer getImportDuration() {
    return importDuration;
    }

        public BulkLoad setImportDuration(Integer importDuration) {
        this.importDuration = importDuration;
        return this;
        }

        public BulkLoad numMetricsImported(Integer numMetricsImported) {
        this.numMetricsImported = numMetricsImported;
        return this;
        }

    /**
        * Get numMetricsImported
    * @return numMetricsImported
    **/
        @JsonProperty("num_metrics_imported")
    @ApiModelProperty(value = "")
    

  public Integer getNumMetricsImported() {
    return numMetricsImported;
    }

        public BulkLoad setNumMetricsImported(Integer numMetricsImported) {
        this.numMetricsImported = numMetricsImported;
        return this;
        }

        public BulkLoad numPointsImported(Long numPointsImported) {
        this.numPointsImported = numPointsImported;
        return this;
        }

    /**
        * Get numPointsImported
    * @return numPointsImported
    **/
        @JsonProperty("num_points_imported")
    @ApiModelProperty(value = "")
    

  public Long getNumPointsImported() {
    return numPointsImported;
    }

        public BulkLoad setNumPointsImported(Long numPointsImported) {
        this.numPointsImported = numPointsImported;
        return this;
        }

        public BulkLoad metrics(List<String> metrics) {
        this.metrics = metrics;
        return this;
        }

            public BulkLoad addMetricsItem(String metricsItem) {
                if (this.metrics == null) {
                this.metrics = new ArrayList<String>();
                }
            this.metrics.add(metricsItem);
            return this;
            }

    /**
        * Get metrics
    * @return metrics
    **/
        @JsonProperty("metrics")
    @ApiModelProperty(value = "")
    

  public List<String> getMetrics() {
    return metrics;
    }

        public BulkLoad setMetrics(List<String> metrics) {
        this.metrics = metrics;
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
        BulkLoad bulkLoad = (BulkLoad) o;
        return Objects.equals(this.startTime, bulkLoad.startTime) &&
        Objects.equals(this.generationDuration, bulkLoad.generationDuration) &&
        Objects.equals(this.importDuration, bulkLoad.importDuration) &&
        Objects.equals(this.numMetricsImported, bulkLoad.numMetricsImported) &&
        Objects.equals(this.numPointsImported, bulkLoad.numPointsImported) &&
        Objects.equals(this.metrics, bulkLoad.metrics);
    }

    @Override
    public int hashCode() {
    return Objects.hash(startTime, generationDuration, importDuration, numMetricsImported, numPointsImported, metrics);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    startTime: ").append(toIndentedString(startTime)).append("\n");
sb.append("    generationDuration: ").append(toIndentedString(generationDuration)).append("\n");
sb.append("    importDuration: ").append(toIndentedString(importDuration)).append("\n");
sb.append("    numMetricsImported: ").append(toIndentedString(numMetricsImported)).append("\n");
sb.append("    numPointsImported: ").append(toIndentedString(numPointsImported)).append("\n");
sb.append("    metrics: ").append(toIndentedString(metrics)).append("\n");
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
