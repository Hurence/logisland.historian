package com.hurence.logisland.historian.service.tag;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvParser;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.hurence.logisland.historian.repository.SolrTagRepository;
import com.hurence.logisland.historian.rest.v1.model.BulkLoad;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.rest.v1.model.error.IOCsvException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public final class TagImportCsv {

    private interface tagFieldMapping {
        public Tag updateTag(Map<String, String> map, Tag tag);
    }

    private static List<tagFieldMapping> fieldMappers = new ArrayList<tagFieldMapping>() {{
        add(new tagFieldMapping() {//node_id
            @Override
            public Tag updateTag(Map<String, String> map, Tag tag) {
                if (map.containsKey("node_id")) {
                    tag.setNodeId(map.get("node_id"));
                } else {
                    throw new IllegalArgumentException("csv line was not containing node_id information");
                }
                return tag;
            }
        });
        add(new tagFieldMapping() {//sampling_rate
            @Override
            public Tag updateTag(Map<String, String> map, Tag tag) {
                if (map.containsKey("sampling_rate")) {
                    tag.setUpdateRate(Integer.valueOf(map.get("sampling_rate")));
                } else {
                    //using default
                }
                return tag;
            }
        });
        add(new tagFieldMapping() {//read_mode
            @Override
            public Tag updateTag(Map<String, String> map, Tag tag) {
                if (map.containsKey("read_mode")) {
                    tag.setPollingMode(Tag.PollingModeEnum.valueOf(map.get("read_mode")));
                } else {
                    //using default
                }
                return tag;
            }
        });
        add(new tagFieldMapping() {//tag_monitored
            @Override
            public Tag updateTag(Map<String, String> map, Tag tag) {
                if (map.containsKey("tag_monitored")) {
                    tag.setEnabled(Boolean.valueOf(map.get("tag_monitored")));
                } else {
                    //using default
                }
                return tag;
            }
        });
        add(new tagFieldMapping() {//description
            @Override
            public Tag updateTag(Map<String, String> map, Tag tag) {
                if (map.containsKey("description")) {
                    tag.setDescription(map.get("description"));
                } else {
                   //using default
                }
                return tag;
            }
        });
        add(new tagFieldMapping() {//type
            @Override
            public Tag updateTag(Map<String, String> map, Tag tag) {
                if (map.containsKey("type")) {
                    tag.setDataType(Tag.DataTypeEnum.valueOf(map.get("type")));
                } else {
                    //using default
                }
                return tag;
            }
        });
        add(new tagFieldMapping() {//server_scan_rate
            @Override
            public Tag updateTag(Map<String, String> map, Tag tag) {
                if (map.containsKey("server_scan_rate")) {
                    tag.setServerScanRate(Integer.valueOf(map.get("server_scan_rate")));
                } else {
                    //using default
                }
                return tag;
            }
        });
        add(new tagFieldMapping() {//server_scan_rate
            @Override
            public Tag updateTag(Map<String, String> map, Tag tag) {
                if (map.containsKey("group")) {
                    tag.setGroup(map.get("group"));
                } else {
                    //using default
                }
                return tag;
            }
        });
        add(new tagFieldMapping() {//datasource_id
            @Override
            public Tag updateTag(Map<String, String> map, Tag tag) {
                if (map.containsKey("datasource_id")) {
                    tag.setDatasourceId(map.get("datasource_id"));
                } else {
                    throw new IllegalArgumentException("csv line was not containing datasource_id information");
                }
                return tag;
            }
        });
        add(new tagFieldMapping() {//tag_name
            @Override
            public Tag updateTag(Map<String, String> map, Tag tag) {
                if (map.containsKey("tag_name")) {
                    tag.setTagName(map.get("tag_name"));
                } else {
                    tag.setTagName(tag.getNodeId());
                }
                return tag;
            }
        });
    }};

    private TagImportCsv() {
    }

    public static BulkLoad importCsvAsTag(MultipartFile multiPartCsv,
                                          char separator, Charset charset,
                                          SolrTagRepository repository,
                                          int bulkSize) {
        MappingIterator<Map<String,String>> it = csvToIteratorOfMap(multiPartCsv, separator, charset);
        return injectIteratorOfMapAsTag(it, repository, bulkSize);
    }

    /**
     *
     * @param multiPartCsv csv file
     * @param separator of csv file
     * @param charset of file
     * @return
     * @throws Exception
     */
    private static MappingIterator<Map<String,String>> csvToIteratorOfMap(MultipartFile multiPartCsv,
                                                                   char separator, Charset charset) {
        CsvMapper mapper = new CsvMapper();
        mapper.enable(CsvParser.Feature.WRAP_AS_ARRAY);
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
     */
    private static Tag mapToTag(Map<String,String> map) {
        Tag tag = new Tag();
        fieldMappers.forEach(mapper -> {
            mapper.updateTag(map, tag);
        });
        return tag;
    }


}
