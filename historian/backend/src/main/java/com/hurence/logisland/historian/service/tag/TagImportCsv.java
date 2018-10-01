package com.hurence.logisland.historian.service.tag;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.hurence.logisland.historian.repository.SolrTagRepository;
import com.hurence.logisland.historian.rest.v1.model.BulkLoad;
import com.hurence.logisland.historian.rest.v1.model.Header;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.rest.v1.model.error.IOCsvException;
import com.hurence.logisland.historian.rest.v1.model.error.RequiredHeaderMissingCsvException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.*;
import java.util.function.BiFunction;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public final class TagImportCsv {

    private static CsvMapper mapper = new CsvMapper();

    private interface TagFieldMapping<T> {
        public String csvField();
        public Boolean required();
        public String type();
        public Tag updateTag(Map<String, T> map, Tag tag);
    }

    private static class TagFieldMappingImpl<T> implements TagFieldMapping<T> {

        final String csvField;
        final String type;
        final boolean required;
        final BiFunction<T, Tag, Tag> updateMethod;

        public TagFieldMappingImpl(String csvField,
                                   Boolean required,
                                   String type,
                                   BiFunction<T, Tag, Tag> updateMethod) {
            this.csvField = csvField;
            this.required = required;
            this.type = type;
            this.updateMethod = updateMethod;
        }
        public String csvField() {
            return this.csvField;
        }
        public Boolean required() {
            return this.required;
        }
        public String type() {
            return this.type;
        }
        public Tag updateTag(Map<String, T> map, Tag tag) {
            if (map.containsKey(csvField)) {
                return this.updateMethod.apply(map.get(csvField), tag);
            } else {
                if (required) throw new RequiredHeaderMissingCsvException(String.format("csv file was not containing %s information", csvField));
                return tag;
            }
        }
    }

    private static class TagFieldStringMappingImpl extends TagFieldMappingImpl<String> {
        public TagFieldStringMappingImpl(String csvField, Boolean required, String type, BiFunction<String, Tag, Tag> updateMethod) {
            super(csvField, required, type, updateMethod);
        }
    }

    private static List<TagFieldMapping> fieldMappers = new ArrayList<TagFieldMapping>() {{
        add(new TagFieldStringMappingImpl("node_id", true, "string",
                (value, tag) -> tag.setNodeId(value)));
        add(new TagFieldStringMappingImpl("sampling_rate", true, "integer",
                (value, tag) -> tag.setUpdateRate(Integer.valueOf(value))));
        add(new TagFieldStringMappingImpl("read_mode", false, "enum:" + Arrays.asList(Tag.PollingModeEnum.values()),
                (value, tag) -> tag.setPollingMode(Tag.PollingModeEnum.fromValue(value))));
        add(new TagFieldStringMappingImpl("tag_monitored", true, "boolean",
                (value, tag) -> tag.setEnabled(Boolean.valueOf(value))));
        add(new TagFieldStringMappingImpl("description", false, "string",
                (value, tag) -> tag.setDescription(value)));
        add(new TagFieldStringMappingImpl("type", true, "enum:" + Arrays.asList(Tag.DataTypeEnum.values()),
                (value, tag) -> tag.setDataType(Tag.DataTypeEnum.fromValue(value))));
        add(new TagFieldStringMappingImpl("server_scan_rate", false, "integer",
                (value, tag) -> tag.setServerScanRate(Integer.valueOf(value))));
        add(new TagFieldStringMappingImpl("group", false, "string",
                (value, tag) -> tag.setGroup(value)));
        add(new TagFieldStringMappingImpl("datasource_id", true, "string",
                (value, tag) -> tag.setDatasourceId(value)));
        add(new TagFieldStringMappingImpl("tag_name", false, "string",
                (value, tag) -> tag.setTagName(value)));
    }};

    private TagImportCsv() {
    }

    public static List<Header> getTagsCsvHeaders() {
        return fieldMappers.stream().map(TagImportCsv::fieldMapperToHeader).collect(Collectors.toList());
    }

    public static BulkLoad importCsvAsTag(MultipartFile multiPartCsv,
                                          char separator, Charset charset,
                                          SolrTagRepository repository,
                                          int bulkSize) {
        MappingIterator<Map<String,String>> it = csvToIteratorOfMap(multiPartCsv, separator, charset);
        return injectIteratorOfMapAsTag(it, repository, bulkSize);
    }

    /**
     * Do not use for production code (used for tests)
     * @param multiPartCsv
     * @param separator
     * @param charset
     * @return
     */
    @Deprecated
    public static Stream<Tag> CsvToTags(MultipartFile multiPartCsv,
                                        char separator, Charset charset) {
        MappingIterator<Map<String,String>> it = csvToIteratorOfMap(multiPartCsv, separator, charset);
        return StreamSupport
                .stream(Spliterators.spliteratorUnknownSize(it, Spliterator.ORDERED), false)
                .map(TagImportCsv::mapToTag);
    }

    /**
     *
     * @param multiPartCsv csv file
     * @param separator of csv file
     * @param charset of file
     * @return
     * @throws IOCsvException if a an IOException occured while reading file
     * @throws IllegalArgumentException if schema has not the required fields
     */
    private static MappingIterator<Map<String,String>> csvToIteratorOfMap(MultipartFile multiPartCsv,
                                                                   char separator, Charset charset) {

        CsvSchema bootstrapSchema = CsvSchema
                .emptySchema()
                .withHeader()
                .withColumnSeparator(separator);
        ObjectReader objReader = mapper
                .readerFor(Map.class)
                .with(bootstrapSchema);
        InputStreamReader is;
        try {
            is = new InputStreamReader(multiPartCsv.getInputStream(), charset);
        } catch (IOException io) {
            throw new IOCsvException(io.getMessage());
        }
        MappingIterator<Map<String,String>> it;
        try {
            it =  objReader.readValues(is);
        } catch (IOException io) {
            throw new IOCsvException(io.getMessage());
        }
        return it;
    }

    /**
     *
     * @param it iterator of map to convert into tags
     * @param repository solr tag repository
     * @param bulkSize number of tag to bulkLoad into solr
     * @return number of tag injected
     * @throws Exception
     */
    private static BulkLoad injectIteratorOfMapAsTag(MappingIterator<Map<String,String>> it,
                                          SolrTagRepository repository,
                                          int bulkSize) {
        final BulkLoad bl = new BulkLoad();
        long startImport = System.currentTimeMillis();
        bl.setStartTime(startImport);
        long counter = 0L;
        ArrayList<Tag> buffer = new ArrayList<>(bulkSize);
        try {
            while (it.hasNextValue()) {
                Tag tag = mapToTag(it.nextValue());
                buffer.add(tag);
                if (buffer.size() == bulkSize) {
                    repository.saveAll(buffer);
                    counter += bulkSize;
                    buffer.clear();
                }
            }
        } catch (IOException io) {
            StringBuilder sb = new StringBuilder("Csv could have been partially imported.");
            sb.append(io.getMessage());
            throw new IOCsvException(sb.toString());
        }
        if (!buffer.isEmpty()) {
            repository.saveAll(buffer);
            counter += buffer.size();
            buffer.clear();
        }
        bl.setNumPointsImported(counter);
        bl.setImportDuration((int) (System.currentTimeMillis() - startImport));
        bl.setMetrics(new ArrayList<String>() {{ add("tags"); }});
        bl.setNumMetricsImported(1);
        return bl;
    }

    /**
     *
     * @param map containing fields for tag
     * @return Tag
     * @throws IllegalArgumentException if map does not contain required fields
     */
    private static Tag mapToTag(Map<String,String> map) {
        Tag tag = new Tag();
        fieldMappers.forEach(mapper -> {
            mapper.updateTag(map, tag);
        });
        return tag;
    }

    /**
     *
     * @param mapper
     * @return a Header
     */
    private static Header fieldMapperToHeader(TagFieldMapping mapper) {
        return new Header()
                .setName(mapper.csvField())
                .setRequired(mapper.required())
                .setType(mapper.type());
    }

}
