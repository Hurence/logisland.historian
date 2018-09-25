package com.hurence.logisland.historian.rest.v1.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.math.BigDecimal;
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
* a Tag is an identifier to an OPC value
*/
    @ApiModel(description = "a Tag is an identifier to an OPC value")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-09-25T12:56:06.238+02:00")


@SolrDocument(solrCoreName = "tag")
public class Tag  implements Serializable {
        @JsonProperty("record_type")
        @Indexed(name = "record_type")
        private String recordType = "tag";

        @JsonProperty("id")
        @Indexed(name = "id")
        private String id = null;

        @JsonProperty("node_id")
        @Indexed(name = "node_id")
        private String nodeId = null;

        @JsonProperty("datasource_id")
        @Indexed(name = "datasource_id")
        private String datasourceId = null;

        @JsonProperty("group")
        @Indexed(name = "group")
        private String group = null;

        @JsonProperty("tag_name")
        @Indexed(name = "tag_name")
        private String tagName = null;

        @JsonProperty("labels")
        @Indexed(name = "labels")
        private List<String> labels = null;

              /**
   * Gets or Sets dataType
   */
  public enum DataTypeEnum {
    INT("int"),
    
    LONG("long"),
    
    FLOAT("float"),
    
    DOUBLE("double"),
    
    STRING("string"),
    
    ARRAY("array"),
    
    BYTES("bytes"),
    
    BOOLEAN("boolean");

    private String value;

    DataTypeEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static DataTypeEnum fromValue(String text) {
      for (DataTypeEnum b : DataTypeEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

        @JsonProperty("data_type")
        @Indexed(name = "data_type")
        private DataTypeEnum dataType = DataTypeEnum.FLOAT;

        @JsonProperty("description")
        @Indexed(name = "description")
        private String description = null;

        @JsonProperty("text")
        @Indexed(name = "text")
        private List<String> text = null;

        @JsonProperty("creation_date")
        @Indexed(name = "creation_date")
        private Long creationDate = null;

        @JsonProperty("last_modification_date")
        @Indexed(name = "last_modification_date")
        private Long lastModificationDate = null;

        @JsonProperty("last_polling_date")
        @Indexed(name = "last_polling_date")
        private Long lastPollingDate = null;

        @JsonProperty("update_rate")
        @Indexed(name = "update_rate")
        private Integer updateRate = null;

        @JsonProperty("server_scan_rate")
        @Indexed(name = "server_scan_rate")
        private Integer serverScanRate = null;

        @JsonProperty("min_numeric_value")
        @Indexed(name = "min_numeric_value")
        private BigDecimal minNumericValue = null;

        @JsonProperty("max_numeric_value")
        @Indexed(name = "max_numeric_value")
        private Double maxNumericValue = null;

        @JsonProperty("last_numeric_value")
        @Indexed(name = "last_numeric_value")
        private Double lastNumericValue = null;

        @JsonProperty("last_quality")
        @Indexed(name = "last_quality")
        private Integer lastQuality = null;

        @JsonProperty("enabled")
        @Indexed(name = "enabled")
        private Boolean enabled = null;

              /**
   * Gets or Sets pollingMode
   */
  public enum PollingModeEnum {
    POLLING("polling"),
    
    SUBSCRIBE("subscribe");

    private String value;

    PollingModeEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static PollingModeEnum fromValue(String text) {
      for (PollingModeEnum b : PollingModeEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

        @JsonProperty("polling_mode")
        @Indexed(name = "polling_mode")
        private PollingModeEnum pollingMode = PollingModeEnum.POLLING;

        public Tag recordType(String recordType) {
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

        public Tag setRecordType(String recordType) {
        this.recordType = recordType;
        return this;
        }

        public Tag id(String id) {
        this.id = id;
        return this;
        }

    /**
        * Get id
    * @return id
    **/
        @JsonProperty("id")
    @ApiModelProperty(value = "")
    

  public String getId() {
    return id;
    }

        public Tag setId(String id) {
        this.id = id;
        return this;
        }

        public Tag nodeId(String nodeId) {
        this.nodeId = nodeId;
        return this;
        }

    /**
        * Get nodeId
    * @return nodeId
    **/
        @JsonProperty("node_id")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public String getNodeId() {
    return nodeId;
    }

        public Tag setNodeId(String nodeId) {
        this.nodeId = nodeId;
        return this;
        }

        public Tag datasourceId(String datasourceId) {
        this.datasourceId = datasourceId;
        return this;
        }

    /**
        * Get datasourceId
    * @return datasourceId
    **/
        @JsonProperty("datasource_id")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public String getDatasourceId() {
    return datasourceId;
    }

        public Tag setDatasourceId(String datasourceId) {
        this.datasourceId = datasourceId;
        return this;
        }

        public Tag group(String group) {
        this.group = group;
        return this;
        }

    /**
        * Get group
    * @return group
    **/
        @JsonProperty("group")
    @ApiModelProperty(value = "")
    

  public String getGroup() {
    return group;
    }

        public Tag setGroup(String group) {
        this.group = group;
        return this;
        }

        public Tag tagName(String tagName) {
        this.tagName = tagName;
        return this;
        }

    /**
        * Get tagName
    * @return tagName
    **/
        @JsonProperty("tag_name")
    @ApiModelProperty(value = "")
    

  public String getTagName() {
    return tagName;
    }

        public Tag setTagName(String tagName) {
        this.tagName = tagName;
        return this;
        }

        public Tag labels(List<String> labels) {
        this.labels = labels;
        return this;
        }

            public Tag addLabelsItem(String labelsItem) {
                if (this.labels == null) {
                this.labels = new ArrayList<String>();
                }
            this.labels.add(labelsItem);
            return this;
            }

    /**
        * can be used to group tags around a theme
    * @return labels
    **/
        @JsonProperty("labels")
    @ApiModelProperty(value = "can be used to group tags around a theme")
    

  public List<String> getLabels() {
    return labels;
    }

        public Tag setLabels(List<String> labels) {
        this.labels = labels;
        return this;
        }

        public Tag dataType(DataTypeEnum dataType) {
        this.dataType = dataType;
        return this;
        }

    /**
        * Get dataType
    * @return dataType
    **/
        @JsonProperty("data_type")
    @ApiModelProperty(required = true, value = "")
      @NotNull


  public DataTypeEnum getDataType() {
    return dataType;
    }

        public Tag setDataType(DataTypeEnum dataType) {
        this.dataType = dataType;
        return this;
        }

        public Tag description(String description) {
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

        public Tag setDescription(String description) {
        this.description = description;
        return this;
        }

        public Tag text(List<String> text) {
        this.text = text;
        return this;
        }

            public Tag addTextItem(String textItem) {
                if (this.text == null) {
                this.text = new ArrayList<String>();
                }
            this.text.add(textItem);
            return this;
            }

    /**
        * ctach all field
    * @return text
    **/
        @JsonProperty("text")
    @ApiModelProperty(value = "ctach all field")
    

  public List<String> getText() {
    return text;
    }

        public Tag setText(List<String> text) {
        this.text = text;
        return this;
        }

        public Tag creationDate(Long creationDate) {
        this.creationDate = creationDate;
        return this;
        }

    /**
        * timestamp
    * @return creationDate
    **/
        @JsonProperty("creation_date")
    @ApiModelProperty(value = "timestamp")
    

  public Long getCreationDate() {
    return creationDate;
    }

        public Tag setCreationDate(Long creationDate) {
        this.creationDate = creationDate;
        return this;
        }

        public Tag lastModificationDate(Long lastModificationDate) {
        this.lastModificationDate = lastModificationDate;
        return this;
        }

    /**
        * timestamp
    * @return lastModificationDate
    **/
        @JsonProperty("last_modification_date")
    @ApiModelProperty(value = "timestamp")
    

  public Long getLastModificationDate() {
    return lastModificationDate;
    }

        public Tag setLastModificationDate(Long lastModificationDate) {
        this.lastModificationDate = lastModificationDate;
        return this;
        }

        public Tag lastPollingDate(Long lastPollingDate) {
        this.lastPollingDate = lastPollingDate;
        return this;
        }

    /**
        * timestamp
    * @return lastPollingDate
    **/
        @JsonProperty("last_polling_date")
    @ApiModelProperty(value = "timestamp")
    

  public Long getLastPollingDate() {
    return lastPollingDate;
    }

        public Tag setLastPollingDate(Long lastPollingDate) {
        this.lastPollingDate = lastPollingDate;
        return this;
        }

        public Tag updateRate(Integer updateRate) {
        this.updateRate = updateRate;
        return this;
        }

    /**
        * polling delay in ms
    * @return updateRate
    **/
        @JsonProperty("update_rate")
    @ApiModelProperty(required = true, value = "polling delay in ms")
      @NotNull


  public Integer getUpdateRate() {
    return updateRate;
    }

        public Tag setUpdateRate(Integer updateRate) {
        this.updateRate = updateRate;
        return this;
        }

        public Tag serverScanRate(Integer serverScanRate) {
        this.serverScanRate = serverScanRate;
        return this;
        }

    /**
        * scan rate of server in ms
    * @return serverScanRate
    **/
        @JsonProperty("server_scan_rate")
    @ApiModelProperty(value = "scan rate of server in ms")
    

  public Integer getServerScanRate() {
    return serverScanRate;
    }

        public Tag setServerScanRate(Integer serverScanRate) {
        this.serverScanRate = serverScanRate;
        return this;
        }

        public Tag minNumericValue(BigDecimal minNumericValue) {
        this.minNumericValue = minNumericValue;
        return this;
        }

    /**
        * Get minNumericValue
    * @return minNumericValue
    **/
        @JsonProperty("min_numeric_value")
    @ApiModelProperty(value = "")
    
  @Valid

  public BigDecimal getMinNumericValue() {
    return minNumericValue;
    }

        public Tag setMinNumericValue(BigDecimal minNumericValue) {
        this.minNumericValue = minNumericValue;
        return this;
        }

        public Tag maxNumericValue(Double maxNumericValue) {
        this.maxNumericValue = maxNumericValue;
        return this;
        }

    /**
        * Get maxNumericValue
    * @return maxNumericValue
    **/
        @JsonProperty("max_numeric_value")
    @ApiModelProperty(value = "")
    

  public Double getMaxNumericValue() {
    return maxNumericValue;
    }

        public Tag setMaxNumericValue(Double maxNumericValue) {
        this.maxNumericValue = maxNumericValue;
        return this;
        }

        public Tag lastNumericValue(Double lastNumericValue) {
        this.lastNumericValue = lastNumericValue;
        return this;
        }

    /**
        * Get lastNumericValue
    * @return lastNumericValue
    **/
        @JsonProperty("last_numeric_value")
    @ApiModelProperty(value = "")
    

  public Double getLastNumericValue() {
    return lastNumericValue;
    }

        public Tag setLastNumericValue(Double lastNumericValue) {
        this.lastNumericValue = lastNumericValue;
        return this;
        }

        public Tag lastQuality(Integer lastQuality) {
        this.lastQuality = lastQuality;
        return this;
        }

    /**
        * Get lastQuality
    * @return lastQuality
    **/
        @JsonProperty("last_quality")
    @ApiModelProperty(value = "")
    

  public Integer getLastQuality() {
    return lastQuality;
    }

        public Tag setLastQuality(Integer lastQuality) {
        this.lastQuality = lastQuality;
        return this;
        }

        public Tag enabled(Boolean enabled) {
        this.enabled = enabled;
        return this;
        }

    /**
        * polling delay in ms
    * @return enabled
    **/
        @JsonProperty("enabled")
    @ApiModelProperty(required = true, value = "polling delay in ms")
      @NotNull


  public Boolean isEnabled() {
    return enabled;
    }

        public Tag setEnabled(Boolean enabled) {
        this.enabled = enabled;
        return this;
        }

        public Tag pollingMode(PollingModeEnum pollingMode) {
        this.pollingMode = pollingMode;
        return this;
        }

    /**
        * Get pollingMode
    * @return pollingMode
    **/
        @JsonProperty("polling_mode")
    @ApiModelProperty(value = "")
    

  public PollingModeEnum getPollingMode() {
    return pollingMode;
    }

        public Tag setPollingMode(PollingModeEnum pollingMode) {
        this.pollingMode = pollingMode;
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
        Tag tag = (Tag) o;
        return Objects.equals(this.recordType, tag.recordType) &&
        Objects.equals(this.id, tag.id) &&
        Objects.equals(this.nodeId, tag.nodeId) &&
        Objects.equals(this.datasourceId, tag.datasourceId) &&
        Objects.equals(this.group, tag.group) &&
        Objects.equals(this.tagName, tag.tagName) &&
        Objects.equals(this.labels, tag.labels) &&
        Objects.equals(this.dataType, tag.dataType) &&
        Objects.equals(this.description, tag.description) &&
        Objects.equals(this.text, tag.text) &&
        Objects.equals(this.creationDate, tag.creationDate) &&
        Objects.equals(this.lastModificationDate, tag.lastModificationDate) &&
        Objects.equals(this.lastPollingDate, tag.lastPollingDate) &&
        Objects.equals(this.updateRate, tag.updateRate) &&
        Objects.equals(this.serverScanRate, tag.serverScanRate) &&
        Objects.equals(this.minNumericValue, tag.minNumericValue) &&
        Objects.equals(this.maxNumericValue, tag.maxNumericValue) &&
        Objects.equals(this.lastNumericValue, tag.lastNumericValue) &&
        Objects.equals(this.lastQuality, tag.lastQuality) &&
        Objects.equals(this.enabled, tag.enabled) &&
        Objects.equals(this.pollingMode, tag.pollingMode);
    }

    @Override
    public int hashCode() {
    return Objects.hash(recordType, id, nodeId, datasourceId, group, tagName, labels, dataType, description, text, creationDate, lastModificationDate, lastPollingDate, updateRate, serverScanRate, minNumericValue, maxNumericValue, lastNumericValue, lastQuality, enabled, pollingMode);
    }


@Override
public String toString() {
StringBuilder sb = new StringBuilder();
sb.append("{\n");

sb.append("    recordType: ").append(toIndentedString(recordType)).append("\n");
sb.append("    id: ").append(toIndentedString(id)).append("\n");
sb.append("    nodeId: ").append(toIndentedString(nodeId)).append("\n");
sb.append("    datasourceId: ").append(toIndentedString(datasourceId)).append("\n");
sb.append("    group: ").append(toIndentedString(group)).append("\n");
sb.append("    tagName: ").append(toIndentedString(tagName)).append("\n");
sb.append("    labels: ").append(toIndentedString(labels)).append("\n");
sb.append("    dataType: ").append(toIndentedString(dataType)).append("\n");
sb.append("    description: ").append(toIndentedString(description)).append("\n");
sb.append("    text: ").append(toIndentedString(text)).append("\n");
sb.append("    creationDate: ").append(toIndentedString(creationDate)).append("\n");
sb.append("    lastModificationDate: ").append(toIndentedString(lastModificationDate)).append("\n");
sb.append("    lastPollingDate: ").append(toIndentedString(lastPollingDate)).append("\n");
sb.append("    updateRate: ").append(toIndentedString(updateRate)).append("\n");
sb.append("    serverScanRate: ").append(toIndentedString(serverScanRate)).append("\n");
sb.append("    minNumericValue: ").append(toIndentedString(minNumericValue)).append("\n");
sb.append("    maxNumericValue: ").append(toIndentedString(maxNumericValue)).append("\n");
sb.append("    lastNumericValue: ").append(toIndentedString(lastNumericValue)).append("\n");
sb.append("    lastQuality: ").append(toIndentedString(lastQuality)).append("\n");
sb.append("    enabled: ").append(toIndentedString(enabled)).append("\n");
sb.append("    pollingMode: ").append(toIndentedString(pollingMode)).append("\n");
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
