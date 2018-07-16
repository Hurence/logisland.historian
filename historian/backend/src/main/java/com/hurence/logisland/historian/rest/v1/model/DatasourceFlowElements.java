package com.hurence.logisland.historian.rest.v1.model;

import com.hurence.logisland.historian.service.TagsApiService;
import org.threeten.bp.OffsetDateTime;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class DatasourceFlowElements {

    public DatasourceFlowElements(Datasource datasource,
                                  String chronixServiceName,
                                  String dataflowName,
                                  String consoleServiceName,
                                  TagsApiService tagsApiService) {


        String opcConfig = buildOpcConfig(datasource, tagsApiService);
        String serviceName = dataflowName + "_" + datasource.getId();
        this.service = this.buildDatasourceService(serviceName, opcConfig);
        this.stream = this.buildDatasourceStream(datasource.getId(),
                chronixServiceName,
                service.getName(),
                consoleServiceName);
    }

    private final Service service;
    private final Stream stream;

    public Service getService() {
        return this.service;
    }

    public Stream getStream() {
        return this.stream;
    }

    public boolean isActive() {
        return this.service != null && this.stream != null;
    }


    private String buildOpcConfig(Datasource datasource,
                                  TagsApiService tagsApiService) {

        StringBuilder strBuilder = new StringBuilder();
        strBuilder.append("clsId=");
        strBuilder.append(datasource.getClsid());
        strBuilder.append("\n");
        strBuilder.append("domain=");
        strBuilder.append(datasource.getDomain());
        strBuilder.append("\n");
        strBuilder.append("password=");
        strBuilder.append(datasource.getPassword());
        strBuilder.append("\n");
        strBuilder.append("user=");
        strBuilder.append(datasource.getUser());
        strBuilder.append("\n");
        strBuilder.append("defaultRefreshPeriodMillis=");
        strBuilder.append("1000");
        strBuilder.append("\n");
        strBuilder.append("defaultSocketTimeoutMillis=");
        strBuilder.append("2000");
        strBuilder.append("\n");
        strBuilder.append("host=");
        strBuilder.append(datasource.getHost());
        strBuilder.append("\n");
        strBuilder.append("tags=");
        Iterator<Tag> it = tagsApiService.getAllTagsFromDatasource(datasource.getId()).iterator();
        Tag tag;
        while (it.hasNext()) {
            tag = it.next();
            strBuilder.append(tag.getTagName());
            if (tag.getUpdateRate() != null) {
                strBuilder.append(":");
                strBuilder.append(tag.getUpdateRate());
            }
            if (it.hasNext()) strBuilder.append(",");
        }
        return strBuilder.toString();
    }

    private Service buildDatasourceService(String serviceName,
                                           String opcConfig) {
        Service service = new Service();
        service.setName(serviceName);
        service.setComponent("com.hurence.logisland.stream.spark.provider.KafkaConnectStructuredProviderService");
        service.setConfig(DataFlowUtil.buildProperties(
                new Property().setKey("kc.data.value.converter").setValue("com.hurence.logisland.connect.converter.LogIslandRecordConverter"),
                new Property().setKey("kc.data.value.converter.properties").setValue("record.serializer=com.hurence.logisland.serializer.KryoSerializer"),
                new Property().setKey("kc.data.key.converter.properties").setValue("schemas.enable=false"),
                new Property().setKey("kc.data.key.converter").setValue("org.apache.kafka.connect.storage.StringConverter"),
                new Property().setKey("kc.worker.tasks.max").setValue("1"),
                new Property().setKey("kc.connector.class").setValue("com.hurence.logisland.connect.opc.da.OpcDaSourceConnector"),
                new Property().setKey("kc.connector.offset.backing.store").setValue("memory"),
                new Property().setKey("kc.connector.offset.backing.store.properties").setValue("foo=bar"),
                new Property()
                        .setKey("kc.connector.properties")
                        .setValue(opcConfig)
        ));
        return service;
    }

    private Stream buildDatasourceStream(String streamName,
                                         String chronixServiceName,
                                         String datasourceServiceName,
                                         String consoleServiceName) {
        Stream stream = new Stream();
        stream.setName(streamName);
        stream.setComponent("com.hurence.logisland.stream.spark.structured.StructuredStream");
        stream.setConfig(DataFlowUtil.buildProperties(
                new Property().setKey("read.topics").setValue("logisland_raw"),
                new Property().setKey("write.topics").setValue("logisland_events"),
                new Property().setKey("read.topics.serializer").setValue("com.hurence.logisland.serializer.KryoSerializer"),
                new Property().setKey("read.topics.client.service").setValue(datasourceServiceName),
                new Property().setKey("write.topics.client.service").setValue(consoleServiceName),
                new Property().setKey("read.topics.key.serializer").setValue("com.hurence.logisland.serializer.StringSerializer"),
                new Property().setKey("write.topics.serializer").setValue("com.hurence.logisland.serializer.JsonSerializer"),
                new Property().setKey("write.topics.key.serializer").setValue("com.hurence.logisland.serializer.StringSerializer")
        ));
        stream.setPipeline(buildDatasourcePipeline(chronixServiceName));
        return stream;
    }

    private Pipeline buildDatasourcePipeline(String chronixServiceName) {
        Pipeline pipeline = new Pipeline();
        pipeline.setLastModified(OffsetDateTime.now());
        pipeline.setModificationReason("rebuilt whole dataflow");
        pipeline.setProcessors(buildDatasourceProcessors(chronixServiceName));
        return pipeline;
    }

    private List<Processor> buildDatasourceProcessors(String chronixServiceName) {
        List<Processor> processors = new ArrayList<>();
        processors.add(DataFlowUtil.buildFlattenProcessor());
        processors.add(DataFlowUtil.buildSendToChronixProcessor(chronixServiceName));
        return processors;
    }
}
