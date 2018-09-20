package com.hurence.logisland.historian.rest.v1.model;

import com.hurence.logisland.historian.config.bean.ChronixConfigurationBean;
import org.threeten.bp.Instant;
import org.threeten.bp.OffsetDateTime;
import org.threeten.bp.ZoneOffset;
import org.threeten.bp.format.DateTimeFormatter;

import java.util.ArrayList;
import java.util.List;

public final class DataFlowUtil {

    private DataFlowUtil() {
    }

    public final static String SINK_SERVICE_NAME_SUFFIX = "_sink_service";
    public final static String CHRONIX_SERVICE_NAME_SUFFIX = "_chronix_service";
    private final static JacksonConverter converter = JacksonConverter.instance();

    public static Service buildSinkService(String dataflowName) {
        Service service = new Service();
        service.setName(dataflowName + SINK_SERVICE_NAME_SUFFIX);
        service.setComponent("com.hurence.logisland.stream.spark.provider.KafkaConnectStructuredSinkProviderService");
        service.setConfig(buildProperties(
                new Property().setKey("kc.data.value.converter").setValue("org.apache.kafka.connect.storage.StringConverter"),
                new Property().setKey("kc.data.value.converter.properties").setValue("foo=bar"),
                new Property().setKey("kc.data.key.converter.properties").setValue("foo=bar"),
                new Property().setKey("kc.data.key.converter").setValue("org.apache.kafka.connect.storage.StringConverter"),
                new Property().setKey("kc.worker.tasks.max").setValue("1"),
                new Property().setKey("kc.connector.offset.backing.store").setValue("memory"),
                new Property().setKey("kc.connector.offset.backing.store.properties").setValue("foo=bar"),
                new Property().setKey("kc.connector.properties").setValue("foo=bar"),
                new Property().setKey("kc.connector.class").setValue("com.hurence.logisland.connect.sink.NullSink")));
        return service;
    }

    public static Service buildChronixService(String dataflowName, ChronixConfigurationBean chronixConfigurationBean) {
        Service service = new Service();
        service.setName(dataflowName + CHRONIX_SERVICE_NAME_SUFFIX);
        service.setComponent("com.hurence.logisland.service.solr.Solr_6_4_2_ChronixClientService");
        service.setConfig(buildProperties(
                new Property().setKey("solr.cloud").setValue(Boolean.toString(chronixConfigurationBean.isSolrCloud())),
                new Property().setKey("solr.connection.string").setValue(chronixConfigurationBean.getConnectionUrl().toString()),
                new Property().setKey("flush.interval").setValue(Long.toString(chronixConfigurationBean.getFlushInterval().toMillis())),
                new Property().setKey("batch.size").setValue(Long.toString(chronixConfigurationBean.getBatchSize())),
                new Property().setKey("solr.collection").setValue(chronixConfigurationBean.getDefaultCollection()),
                new Property().setKey("group.by").setValue("tag_id,quality")

        ));
        return service;
    }

    public static Processor buildFlattenProcessor() {
        Processor proc = new Processor();
        proc.setName("flatten");
        proc.setComponent("com.hurence.logisland.processor.FlatMap");
        proc.setConfig(buildProperties(
                new Property().setKey("keep.root.record").setValue("false"),
                new Property().setKey("copy.root.record.fields").setValue("true")
        ));
        return proc;
    }

    public static Processor buildAddFields(String datasourceId) {
        Processor proc = new Processor();
        proc.setName("add_fields");
        proc.setComponent("com.hurence.logisland.processor.AddFields");
        proc.setDocumentation("Add some metadata");
        proc.setConfig(buildProperties(
                new Property().setKey("conflict.resolution.policy").setValue("overwrite_existing"),
                new Property().setKey("datasource_id").setValue(datasourceId),
                new Property().setKey("record_name").setValue("${tag_id}"),
                new Property().setKey("record_type").setValue("metric")
        ));
        return proc;
    }

    public static Processor buildRenameFields() {
        Processor proc = new Processor();
        proc.setName("rename_fields");
        proc.setComponent("com.hurence.logisland.processor.NormalizeFields");
        proc.setDocumentation("Set the current timestamp to the tag sampled timestamp");
        proc.setConfig(buildProperties(
                new Property().setKey("conflict.resolution.policy").setValue("overwrite_existing"),
                new Property().setKey("record_time").setValue("tag_sampled_timestamp")
        ));
        return proc;
    }

    public static Processor buildRemoveFields() {
        Processor proc = new Processor();
        proc.setName("remove_fields");
        proc.setComponent("com.hurence.logisland.processor.RemoveFields");
        proc.setDocumentation("Remove unused fields");
        proc.setConfig(buildProperties(
                new Property().setKey("fields.to.remove").setValue("tag_source_timestamp,tag_sampled_timestamp")
        ));
        return proc;
    }

    public static Processor buildAddDebugProcessor() {
        Processor proc = new Processor();
        proc.setName("stream_debugger");
        proc.setComponent("com.hurence.logisland.processor.DebugStream");
        proc.setDocumentation("debug records");
        proc.setConfig(buildProperties(
                new Property().setKey("event.serializer").setValue("json")
        ));
        return proc;
    }

    public static Processor buildSendToChronixProcessor(String chronixServiceName) {
        Processor proc = new Processor();
        proc.setName("send_to_chronix");
        proc.setComponent("com.hurence.logisland.processor.datastore.BulkPut");
        proc.setConfig(buildProperties(
                new Property().setKey("datastore.client.service").setValue(chronixServiceName),
                new Property().setKey("default.collection").setValue("chronix")
        ));
        return proc;
    }

    public static List<Property> buildProperties(Property... props) {
        List<Property> properties = new ArrayList<>();
        for (Property prop : props) {
            properties.add(prop);
        }
        return properties;
    }

    public static DataFlow convertDfstoDf(DataFlowSimple dfs) {
        DataFlow df = new DataFlow();
        df.setId(dfs.getId());
        df.setLastModified(
                DateUtil.toUtcDateForSolr(
                        OffsetDateTime.ofInstant(Instant.ofEpochMilli(dfs.getLastModified()), ZoneOffset.UTC)
                )
        );
        df.setModificationReason(dfs.getModificationReason());
        df.setStreams(converter.fromJson(dfs.getStreams(), List.class, Stream.class));
        df.setServices(converter.fromJson(dfs.getServices(), List.class, Service.class));
        return df;
    }

    public static DataFlowSimple convertDftoDfs(DataFlow df) {
        DataFlowSimple dfs = new DataFlowSimple();
        dfs.setId(df.getId());
        dfs.setLastModified(
                OffsetDateTime.parse(
                        df.getLastModified(), DateTimeFormatter.ISO_DATE_TIME
                ).toEpochSecond() * 1000L
        );
        dfs.setModificationReason(df.getModificationReason());
        dfs.setStreams(converter.toJson(df.getStreams()));
        dfs.setServices(converter.toJson(df.getServices()));
        return dfs;
    }

}
