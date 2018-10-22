package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.hurence.logisland.historian.rest.v1.model.ZoneRange;
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
* A gauge is representing the measure of last value, you can specify other tags to be delimiter for anormal range of values. 
*/
    @ApiModel(description = "A gauge is representing the measure of last value, you can specify other tags to be delimiter for anormal range of values. ")

@SolrDocument(solrCoreName = "historian")
public class Gauge  implements Serializable {
        @JsonProperty("type")
        @Indexed(name = "type")
        private String type = "gauge";

        @JsonProperty("name")
        @Indexed(name = "name")
        private String name = null;

        @JsonProperty("from")
        @Indexed(name = "from")
        private String from = null;

        @JsonProperty("to")
        @Indexed(name = "to")
        private String to = null;

        @JsonProperty("autorefresh")
        @Indexed(name = "autorefresh")
        private Long autorefresh = null;

        @JsonProperty("min")
        @Indexed(name = "min")
        private String min = null;

        @JsonProperty("max")
        @Indexed(name = "max")
        private String max = null;

        @JsonProperty("zoneranges")
        @Indexed(name = "zoneranges")
        private List<ZoneRange> zoneranges = new ArrayList<ZoneRange>();

    /**
        * Type of panel.
    * @return type
    **/
        @JsonProperty("type")
    @ApiModelProperty(value = "Type of panel.")
    

  public String getType() {
    return type;
    }

        public Gauge name(String name) {
        this.name = name;
        return this;
        }

    /**
        * Name of the gauge.
    * @return name
    **/
        @JsonProperty("name")
    @ApiModelProperty(required = true, value = "Name of the gauge.")
      @NotNull


  public String getName() {
    return name;
    }

        public Gauge setName(String name) {
        this.name = name;
        return this;
        }

        public Gauge from(String from) {
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

        public Gauge setFrom(String from) {
        this.from = from;
        return this;
        }

        public Gauge to(String to) {
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

        public Gauge setTo(String to) {
        this.to = to;
        return this;
        }

        public Gauge autorefresh(Long autorefresh) {
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

        public Gauge setAutorefresh(Long autorefresh) {
        this.autorefresh = autorefresh;
        return this;
        }

        public Gauge min(String min) {
        this.min = min;
        return this;
        }

    /**
        * Minimum of the gauge. Can be a number or a string representing id of a tag.
    * @return min
    **/
        @JsonProperty("min")
    @ApiModelProperty(required = true, value = "Minimum of the gauge. Can be a number or a string representing id of a tag.")
      @NotNull


  public String getMin() {
    return min;
    }

        public Gauge setMin(String min) {
        this.min = min;
        return this;
        }

        public Gauge max(String max) {
        this.max = max;
        return this;
        }

    /**
        * Maximum of the gauge. Can be a number or a string representing id of a tag.
    * @return max
    **/
        @JsonProperty("max")
    @ApiModelProperty(required = true, value = "Maximum of the gauge. Can be a number or a string representing id of a tag.")
      @NotNull


  public String getMax() {
    return max;
    }

        public Gauge setMax(String max) {
        this.max = max;
        return this;
        }

        public Gauge zoneranges(List<ZoneRange> zoneranges) {
        this.zoneranges = zoneranges;
        return this;
        }

            public Gauge addZonerangesItem(ZoneRange zonerangesItem) {
            this.zoneranges.add(zonerangesItem);
            return this;
            }

    /**
        * List of colored zones in gauge.
    * @return zoneranges
    **/
        @JsonProperty("zoneranges")
    @ApiModelProperty(required = true, value = "List of colored zones in gauge.")
      @NotNull

  @Valid

  public List<ZoneRange> getZoneranges() {
    return zoneranges;
    }

        public Gauge setZoneranges(List<ZoneRange> zoneranges) {
        this.zoneranges = zoneranges;
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
        Gauge gauge = (Gauge) o;
        return Objects.equals(this.type, gauge.type) &&
        Objects.equals(this.name, gauge.name) &&
        Objects.equals(this.from, gauge.from) &&
        Objects.equals(this.to, gauge.to) &&
        Objects.equals(this.autorefresh, gauge.autorefresh) &&
        Objects.equals(this.min, gauge.min) &&
        Objects.equals(this.max, gauge.max) &&
        Objects.equals(this.zoneranges, gauge.zoneranges);
    }

    @Override
    public int hashCode() {
    return Objects.hash(type, name, from, to, autorefresh, min, max, zoneranges);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    type: ").append(toIndentedString(type)).append("\n");
sb.append("    name: ").append(toIndentedString(name)).append("\n");
sb.append("    from: ").append(toIndentedString(from)).append("\n");
sb.append("    to: ").append(toIndentedString(to)).append("\n");
sb.append("    autorefresh: ").append(toIndentedString(autorefresh)).append("\n");
sb.append("    min: ").append(toIndentedString(min)).append("\n");
sb.append("    max: ").append(toIndentedString(max)).append("\n");
sb.append("    zoneranges: ").append(toIndentedString(zoneranges)).append("\n");
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
