package com.hurence.logisland.historian.rest.v1.model;

import com.hurence.logisland.historian.config.bean.OpcConfigurationBean;
import com.hurence.logisland.historian.service.TagsApiService;
import org.threeten.bp.OffsetDateTime;

import java.io.IOException;
import java.io.StringWriter;
import java.io.UncheckedIOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

public class DatasourceFlowElements {

    public DatasourceFlowElements(Datasource datasource,
                                  String chronixServiceName,
                                  String dataflowName,
                                  String consoleServiceName,
                                  TagsApiService tagsApiService,
                                  OpcConfigurationBean opcConfigurationBean) {
        this.opcConfigurationBean = opcConfigurationBean;
        List<Tag> tagList = tagsApiService.getAllEnabledTagsFromDatasource(datasource.getId())
                .stream().filter(Tag::isEnabled).collect(Collectors.toList());

        if (!tagList.isEmpty()) {
            String opcConfig = buildOpcConfig(datasource, tagList);
            String serviceName = dataflowName + "_" + datasource.getId();
            this.service = this.buildDatasourceService(serviceName, datasource.getDatasourceType(), opcConfig);
            this.stream = this.buildDatasourceStream(datasource.getId(),
                    chronixServiceName,
                    service.getName(),
                    consoleServiceName,
                    datasource.getId());
        } else {
            this.service = null;
            this.stream = null;
        }

    }

    private final Service service;
    private final Stream stream;
    private final OpcConfigurationBean opcConfigurationBean;

    public Service getService() {
        return this.service;
    }

    public Stream getStream() {
        return this.stream;
    }

    public boolean isActive() {
        return this.service != null && this.stream != null;
    }


    private Properties generateOpcDaProperties(Datasource datasource, List<Tag> tags) {
        Properties ret = new Properties();
        if (datasource.getClsid() != null) {
            ret.put("server.clsId", datasource.getClsid());
        }
        if (datasource.getProgId() != null) {
            ret.put("server.progId", datasource.getProgId());
        }
        ret.put("auth.ntlm.user", datasource.getUser());
        ret.put("auth.ntlm.password", datasource.getPassword());
        ret.put("auth.ntlm.domain", datasource.getDomain());
        ret.put("session.refreshPeriodMillis", Long.toString(
                Math.max(opcConfigurationBean.getDa().getMinimumSessionGroupRefreshRate().toMillis(),
                        tags.stream().mapToLong(Tag::getUpdateRate).min().orElse(0))));
        ret.put("server.uri", "opc.da://" + datasource.getHost());

        return ret;
    }

    private Properties generateOpcUaProperties(Datasource datasource) {
        Properties ret = new Properties();
        ret.put("session.publicationRate", opcConfigurationBean.getUa().getSessionPublicationRate().toString());
        if (datasource.getUser() != null) {
            ret.put("auth.basic.user", datasource.getUser());
            ret.put("auth.basic.password", datasource.getPassword());
        }
        ret.put("server.uri", datasource.getHost());
        return ret;
    }

    private String buildOpcConfig(Datasource datasource, List<Tag> tags) {
        Properties properties = null;
        switch (datasource.getDatasourceType()) {
            case OPC_UA:
                properties = generateOpcUaProperties(datasource);
                break;
            case OPC_DA:
                properties = generateOpcDaProperties(datasource, tags);
                break;
            default:
                throw new IllegalStateException("Unhandled datasource type " + datasource.getDatasourceType());
        }
        properties.put("connection.socketTimeoutMillis", Long.toString(opcConfigurationBean.getDefaultSocketTimeout().toMillis()));
        properties.put("tags.id", tags.stream().map(Tag::getNodeId).collect(Collectors.joining(",")));
        properties.put("tags.sampling.rate", tags.stream().map(Tag::getUpdateRate)
                .map(Duration::ofMillis)
                .map(Duration::toString)
                .collect(Collectors.joining(",")));
        properties.put("tags.stream.mode", tags.stream()
                .map(t -> Tag.PollingModeEnum.POLLING.equals(t.getPollingMode()) ? "POLL" : "SUBSCRIBE")
                .collect(Collectors.joining(",")));


        try {
            StringWriter stringWriter = new StringWriter();
            properties.store(stringWriter, null);
            return stringWriter.toString();

        } catch (IOException e) {
            throw new UncheckedIOException("Unable to generate properties for datasource " + datasource.getId(), e);
        }
    }

    private Service buildDatasourceService(String serviceName, Datasource.DatasourceTypeEnum datasourceType,
                                           String opcConfig) {
        Service service = new Service();
        service.setName(serviceName);
        service.setComponent("com.hurence.logisland.stream.spark.provider.KafkaConnectStructuredSourceProviderService");
        service.setConfig(DataFlowUtil.buildProperties(
                new Property().setKey("kc.data.value.converter").setValue("com.hurence.logisland.connect.converter.LogIslandRecordConverter"),
                new Property().setKey("kc.data.value.converter.properties").setValue("record.serializer=com.hurence.logisland.serializer.KryoSerializer"),
                new Property().setKey("kc.data.key.converter.properties").setValue("schemas.enable=false"),
                new Property().setKey("kc.data.key.converter").setValue("org.apache.kafka.connect.storage.StringConverter"),
                new Property().setKey("kc.worker.tasks.max").setValue("1"),
                new Property().setKey("kc.partitions.max").setValue("4"),
                new Property().setKey("kc.connector.class").setValue(
                        Datasource.DatasourceTypeEnum.OPC_DA.equals(datasourceType) ? "com.hurence.logisland.connect.opc.da.OpcDaSourceConnector" :
                                "com.hurence.logisland.connect.opc.ua.OpcUaSourceConnector"),
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
                                         String consoleServiceName,
                                         String dataourceId) {
        Stream stream = new Stream();
        stream.setName(streamName);
        stream.setComponent("com.hurence.logisland.stream.spark.structured.StructuredStream");
        stream.setConfig(DataFlowUtil.buildProperties(
                new Property().setKey("read.topics").setValue("none"),
                new Property().setKey("write.topics").setValue("none"),
                new Property().setKey("read.topics.serializer").setValue("com.hurence.logisland.serializer.KryoSerializer"),
                new Property().setKey("read.topics.client.service").setValue(datasourceServiceName),
                new Property().setKey("write.topics.client.service").setValue(consoleServiceName),
                new Property().setKey("read.topics.key.serializer").setValue("com.hurence.logisland.serializer.StringSerializer"),
                new Property().setKey("write.topics.serializer").setValue("com.hurence.logisland.serializer.JsonSerializer"),
                new Property().setKey("write.topics.key.serializer").setValue("com.hurence.logisland.serializer.StringSerializer")
        ));
        stream.setPipeline(buildDatasourcePipeline(chronixServiceName, dataourceId));
        return stream;
    }

    private Pipeline buildDatasourcePipeline(String chronixServiceName, String dataourceId) {
        Pipeline pipeline = new Pipeline();
        pipeline.setLastModified(DateUtil.toUtcDateForSolr(OffsetDateTime.now()));
        pipeline.setModificationReason("rebuilt whole dataflow");
        pipeline.setProcessors(buildDatasourceProcessors(chronixServiceName, dataourceId));
        return pipeline;
    }

    private List<Processor> buildDatasourceProcessors(String chronixServiceName, String dataourceId) {
        List<Processor> processors = new ArrayList<>();
        processors.add(DataFlowUtil.buildFlattenProcessor());
        processors.add(DataFlowUtil.buildAddFields(dataourceId));
        processors.add(DataFlowUtil.buildRenameFields());
        processors.add(DataFlowUtil.buildRemoveFields());
//        processors.add(DataFlowUtil.buildAddDebugProcessor());
        processors.add(DataFlowUtil.buildSendToChronixProcessor(chronixServiceName));
        return processors;
    }
}
