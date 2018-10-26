package com.hurence.logisland.historian.rest.v1.model.dashboard;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.Serializable;
import javax.validation.constraints.*;

import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;
import org.threeten.bp.format.DateTimeFormatter;
import org.threeten.bp.OffsetDateTime;

/**
* A ZoneRange is a range between two value with an associated color. 
*/
@ApiModel(description = "A ZoneRange is a range between two value with an associated color. ")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ZoneRange  implements Serializable {
        @JsonProperty("color")
        @Indexed(name = "color")
        private String color = null;

        @JsonProperty("from")
        @Indexed(name = "from")
        private String from = null;

        @JsonProperty("to")
        @Indexed(name = "to")
        private String to = null;

        public ZoneRange color(String color) {
        this.color = color;
        return this;
        }

    /**
        * The color of the zone.
    * @return color
    **/
        @JsonProperty("color")
    @ApiModelProperty(required = true, value = "The color of the zone.")
      @NotNull


  public String getColor() {
    return color;
    }

        public ZoneRange setColor(String color) {
        this.color = color;
        return this;
        }

        public ZoneRange from(String from) {
        this.from = from;
        return this;
        }

    /**
        * The start value for the zone to delimit.
    * @return from
    **/
        @JsonProperty("from")
    @ApiModelProperty(required = true, value = "The start value for the zone to delimit.")
      @NotNull


  public String getFrom() {
    return from;
    }

        public ZoneRange setFrom(String from) {
        this.from = from;
        return this;
        }

        public ZoneRange to(String to) {
        this.to = to;
        return this;
        }

    /**
        * The end value for the zone to delimit.
    * @return to
    **/
        @JsonProperty("to")
    @ApiModelProperty(required = true, value = "The end value for the zone to delimit.")
      @NotNull


  public String getTo() {
    return to;
    }

        public ZoneRange setTo(String to) {
        this.to = to;
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
        ZoneRange zoneRange = (ZoneRange) o;
        return Objects.equals(this.color, zoneRange.color) &&
        Objects.equals(this.from, zoneRange.from) &&
        Objects.equals(this.to, zoneRange.to);
    }

    @Override
    public int hashCode() {
    return Objects.hash(color, from, to);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    color: ").append(toIndentedString(color)).append("\n");
sb.append("    from: ").append(toIndentedString(from)).append("\n");
sb.append("    to: ").append(toIndentedString(to)).append("\n");
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
