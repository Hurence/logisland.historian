package com.hurence.logisland.historian.rest.v1.model;

import org.threeten.bp.OffsetDateTime;
import org.threeten.bp.Instant;
import org.threeten.bp.ZoneId;
import org.threeten.bp.ZoneOffset;
import org.threeten.bp.format.DateTimeFormatter;

import java.util.ArrayList;
import java.util.List;

public final class DataFlowUtil {

    private DataFlowUtil() {}

    public final static String CONSOLE_SERVICE_NAME_SUFFIX = "_console_service";
    public final static String CHRONIX_SERVICE_NAME_SUFFIX = "_chronix_service";
    private final static JacksonConverter converter = JacksonConverter.instance();

    public static Service buildConsoleService(String dataflowName) {
        Service service = new Service();
        service.setName(dataflowName + CONSOLE_SERVICE_NAME_SUFFIX);
        service.setComponent("com.hurence.logisland.stream.spark.structured.provider.ConsoleStructuredStreamProviderService");
        return service;
    }
    public static Service buildChronixService(String dataflowName) {
        Service service = new Service();
        service.setName(dataflowName + CHRONIX_SERVICE_NAME_SUFFIX);
        service.setComponent("com.hurence.logisland.service.solr.Solr_6_4_2_ChronixClientService");
        service.setConfig(buildProperties(
                new Property().setKey("solr.cloud").setValue("false"),
                new Property().setKey("solr.connection.string").setValue("http://localhost:8983/solr"),
                new Property().setKey("solr.connection").setValue("chronix"),
                new Property().setKey("solr.concurrent.requests").setValue("4"),
                new Property().setKey("flush.interval").setValue("2000"),
                new Property().setKey("batch.size").setValue("500")
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

    public static Processor buildSendToChronixProcessor(String chronixServiceName) {
        Processor proc = new Processor();
        proc.setName("send_to_chronix");
        proc.setComponent("com.hurence.logisland.processor.datastore.BulkPut");
        proc.setConfig(buildProperties(
                new Property().setKey("datastore.client.service").setValue(chronixServiceName) //TODO put real service
        ));
        return proc;
    }

    public static List<Property> buildProperties(Property... props) {
        List<Property> properties = new ArrayList<>();
        for (Property prop: props) {
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
        df.setStreams(converter.fromJson(dfs.getStreams(),List.class, Stream.class));
        df.setServices(converter.fromJson(dfs.getServices(),List.class, Service.class));
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
