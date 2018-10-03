package com.hurence.logisland.historian.service.tag;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.hurence.logisland.historian.repository.SolrTagRepository;
import com.hurence.logisland.historian.rest.v1.model.*;
import com.hurence.logisland.historian.rest.v1.model.error.IOCsvException;
import com.hurence.logisland.historian.rest.v1.model.error.RequiredHeaderMissingCsvException;
import com.hurence.logisland.historian.service.DatasourcesApiService;
import com.hurence.logisland.historian.service.TagsApiService;
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
        public boolean required();
        public String type();
        public Optional<T> defaut();
        public Tag updateTag(Map<String, T> map, Tag tag);
    }

    private static class TagFieldMappingImpl<T> implements TagFieldMapping<T> {

        final String csvField;
        final String type;
        final boolean required;
        final T defaut;
        final BiFunction<T, Tag, Tag> updateMethod;

        public TagFieldMappingImpl(String csvField,
                                   Boolean required,
                                   String type,
                                   T defaut,
                                   BiFunction<T, Tag, Tag> updateMethod) {
            this.csvField = csvField;
            this.required = required;
            this.type = type;
            this.defaut = defaut;
            this.updateMethod = updateMethod;
        }
        public String csvField() {
            return this.csvField;
        }
        public boolean required() {
            return this.required;
        }
        public String type() {
            return this.type;
        }
        public Optional<T> defaut() {
            if (this.defaut == null) return Optional.empty();
            return Optional.of(this.defaut);
        }
        public Tag updateTag(Map<String, T> map, Tag tag) {
            if (map.containsKey(csvField)) {
                return this.updateMethod.apply(map.get(csvField), tag);
            } else {
                if (defaut().isPresent()) {
                    return this.updateMethod.apply(defaut().get(), tag);
                } else {
                    if (required) throw new RequiredHeaderMissingCsvException(String.format("csv file was not containing %s information", csvField));
                    return tag;
                }
            }
        }
    }

    private static class TagFieldStringMappingImpl extends TagFieldMappingImpl<String> {
        public TagFieldStringMappingImpl(String csvField, Boolean required, String type, String defaut, BiFunction<String, Tag, Tag> updateMethod) {
            super(csvField, required, type, defaut, updateMethod);
        }
    }

    private static List<TagFieldMapping> fieldMappers = new ArrayList<TagFieldMapping>() {{
        add(new TagFieldStringMappingImpl("node_id", true, "string", null,
                (value, tag) -> tag.setNodeId(value)));
        add(new TagFieldStringMappingImpl("sampling_rate", true, "integer", null,
                (value, tag) -> tag.setUpdateRate(Integer.valueOf(value))));
        add(new TagFieldStringMappingImpl("read_mode", false,
                "enum:" + Arrays.asList(Tag.PollingModeEnum.values()),  null,
                (value, tag) -> tag.setPollingMode(Tag.PollingModeEnum.fromValue(value))));
        add(new TagFieldStringMappingImpl("tag_monitored", true, "boolean", null,
                (value, tag) -> tag.setEnabled(Boolean.valueOf(value))));
        add(new TagFieldStringMappingImpl("description", false, "string", null,
                (value, tag) -> tag.setDescription(value)));
        add(new TagFieldStringMappingImpl("type", true,
                "enum:" + Arrays.asList(Tag.DataTypeEnum.values()), null,
                (value, tag) -> tag.setDataType(Tag.DataTypeEnum.fromValue(value))));
        add(new TagFieldStringMappingImpl("server_scan_rate", false, "integer", null,
                (value, tag) -> tag.setServerScanRate(Integer.valueOf(value))));
        add(new TagFieldStringMappingImpl("group", false, "string", null,
                (value, tag) -> tag.setGroup(value)));
        add(new TagFieldStringMappingImpl("datasource_id", true, "string", null,
                (value, tag) -> tag.setDatasourceId(value)));
        add(new TagFieldStringMappingImpl("tag_name", false, "string", null,
                (value, tag) -> tag.setTagName(value)));
    }};

    private TagImportCsv() {
    }

    public static List<Header> getTagsCsvHeaders() {
        return fieldMappers.stream().map(TagImportCsv::fieldMapperToHeader).collect(Collectors.toList());
    }

    public static ImportTagReport importCsvAsTag(MultipartFile multiPartCsv,
                                                 char separator, Charset charset,
                                                 TagsApiService tagService,
                                                 DatasourcesApiService datasourceService,
                                                 int bulkSize,
                                                 List<HeaderDefault> defaultHeaders) {
        MappingIterator<Map<String,String>> it = csvToIteratorOfMap(multiPartCsv, separator, charset);
        return injectIteratorOfMapAsTag(it, tagService, datasourceService, bulkSize, defaultHeaders);
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
                .map(map -> TagImportCsv.mapToTag(map, Collections.emptyList()));
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
     * @param tagService tag service for interacting with database
     * @param bulkSize number of tag to bulkLoad into solr
     * @return number of tag injected
     * @throws Exception
     */
    private static ImportTagReport injectIteratorOfMapAsTag(MappingIterator<Map<String,String>> it,
                                                     TagsApiService tagService,
                                                     DatasourcesApiService datasourceService,
                                                     int bulkSize,
                                                     List<HeaderDefault> defaultHeaders) {
        final ImportTagReport report = new ImportTagReport();
        long startImport = System.currentTimeMillis();
        report.setStartTime(startImport);
        long counter = 0L;
        ArrayList<Tag> buffer = new ArrayList<>(bulkSize);
        Set<String> datasourcesThatExist = new HashSet<String>(10);
        Set<String> datasourcesThatDoesNotExist = new HashSet<String>(10);
        try {
            while (it.hasNextValue()) {
                Tag tag = mapToTag(it.nextValue(), defaultHeaders);
                handleBuffer(tag, buffer, datasourcesThatExist, datasourcesThatDoesNotExist, datasourceService, report);
                if (buffer.size() == bulkSize) {
                    tagService.SaveOrUpdateMany(buffer);
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
            tagService.SaveOrUpdateMany(buffer);
            counter += buffer.size();
            buffer.clear();
        }
        report.setNumTagsImported(counter);
        report.setImportDuration((int) (System.currentTimeMillis() - startImport));
        return report;
    }

    private static void handleBuffer(Tag tag,
                                     ArrayList<Tag> buffer,
                                     Set<String> datasourcesThatExist,
                                     Set<String> datasourcesThatDoesNotExist,
                                     DatasourcesApiService datasourceService,
                                     ImportTagReport report) {
        if (datasourcesThatExist.contains(tag.getDatasourceId())) {
            buffer.add(tag);
        } else {
            if (!datasourcesThatDoesNotExist.contains(tag.getDatasourceId())) {
                if (datasourceService.exist(tag.getDatasourceId())) {
                    datasourcesThatExist.add(tag.getDatasourceId());
                    buffer.add(tag);
                } else {
                    datasourcesThatDoesNotExist.add(tag.getDatasourceId());
                    long oldCounter = report.getNumTagsNotImported() == null ? 0 : report.getNumTagsNotImported();
                    report.setNumTagsNotImported(oldCounter + 1);
                    report.addErrorsItem(String.format("datasource_id '%s' does not exist (corresponding tags were not injected)", tag.getDatasourceId()));
                }
            } else {
                long oldCounter = report.getNumTagsNotImported() == null ? 0 : report.getNumTagsNotImported();
                report.setNumTagsNotImported(oldCounter + 1);
            }
        }
    }

    /**
     *
     * @param map containing fields for tag
     * @return Tag
     * @throws IllegalArgumentException if map does not contain required fields
     */
    private static Tag mapToTag(Map<String,String> map, List<HeaderDefault> defaultHeaders) {
        Tag tag = new Tag();
        defaultHeaders.forEach(defaut -> {
            if (!map.containsKey(defaut.getName())) {
                map.put(defaut.getName(), defaut.getValue());
            }
        });
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
