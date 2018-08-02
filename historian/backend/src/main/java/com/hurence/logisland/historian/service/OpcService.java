/*
 *  Copyright (C) 2018 Hurence (support@hurence.com)
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.hurence.logisland.historian.service;

import com.hurence.logisland.historian.repository.OpcRepository;
import com.hurence.logisland.historian.rest.v1.api.NotFoundException;
import com.hurence.logisland.historian.rest.v1.model.Datasource;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.opc.OpcObjectInfo;
import com.hurence.opc.OpcTagInfo;
import com.hurence.opc.auth.UsernamePasswordCredentials;
import com.hurence.opc.da.OpcDaConnectionProfile;
import com.hurence.opc.ua.OpcUaConnectionProfile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import scala.Tuple2;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Spring Opc-da service.
 *
 * @author amarziali
 */
@Service
public class OpcService {

    private static final Logger logger = LoggerFactory.getLogger(OpcService.class);


    private DatasourcesApiService datasourcesApiService;
    private OpcRepository opcRepository;
    private long socketTimeoutMillis;

    /**
     * Converts Java Data Type to historian tag {@link com.hurence.logisland.historian.rest.v1.model.Tag.DataTypeEnum}
     *
     * @param dataType the java data type (coming from OPC {@link com.hurence.opc.OpcTagInfo})
     * @return the {@link com.hurence.logisland.historian.rest.v1.model.Tag.DataTypeEnum} that applies.
     */
    private Tag.DataTypeEnum mapDataType(Type dataType) {
        if (dataType instanceof Class<?>) {
            Class<?> cls = (Class<?>) dataType;
            if (cls.isArray()) {
                if (cls.isAssignableFrom(Byte[].class)) {
                    return Tag.DataTypeEnum.BYTES;
                }
                return Tag.DataTypeEnum.ARRAY;
            } else if (Integer.class.equals(cls) || Byte.class.equals(cls) ||
                    Short.class.equals(cls) || Character.class.equals(cls)) {
                return Tag.DataTypeEnum.INT;
            } else if (Long.class.equals(cls) || Instant.class.equals(cls)) {
                return Tag.DataTypeEnum.LONG;
            } else if (Float.class.equals(cls)) {
                return Tag.DataTypeEnum.FLOAT;
            } else if (Double.class.equals(cls) || BigDecimal.class.equals(cls)) {
                return Tag.DataTypeEnum.DOUBLE;
            } else if (Boolean.class.equals(cls)) {
                return Tag.DataTypeEnum.BOOLEAN;
            } else if (String.class.equals(cls) || Void.class.equals(cls)) {
                return Tag.DataTypeEnum.STRING;
            }
        }
        throw new IllegalStateException("Unhandled datatype :" + dataType);

    }


    /**
     * Browse all tags from all available datasources.
     *
     * @return the never null list of {@link Tag}
     */
    public List<Tag> browseAllTags() {
        return datasourcesApiService.getAllDatasources("*").stream()
                .map(Datasource::getId)
                .map(id -> browseDatasourceTag(id, null, null))
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
    }

    /**
     * Fetch metadata from a tag in a certain datasource.
     * @param datasourceId the id of the historian datasource.
     * @param tag the tag if
     * @return the {@link Tag} information.
     */
    public Tag fetchMetadata(String datasourceId, String tag) {
        Datasource datasource = datasourcesApiService.getDatasource(datasourceId).orElseThrow(() -> new NotFoundException(HttpStatus.NOT_FOUND.value(),
                "Unable to find datasource with id " + datasourceId));
        logger.info("Fetching tags for datasource id {}", datasourceId);
        OpcObjectInfo info;
        switch (datasource.getDatasourceType()) {
            case OPC_DA:
                info = opcRepository.fetchTagMetadata(createOpcDaConnectionProfile(datasource), tag);
                break;
            case OPC_UA:
                info = opcRepository.fetchTagMetadata(createOpcUaConnectionProfile(datasource), tag);
                break;
            default:
                throw new RuntimeException("Unknown datasource type" + datasource.getDatasourceType());
        }
        return convertOpcTagInfoToHistorianTag(info, null, datasource);
    }




    /**
     * Browse all the tags available in a datasource.
     *
     * @param datasourceId the datasource to browse.
     * @return the never null list of {@link Tag}
     */
    public List<Tag> browseDatasourceTag(String datasourceId, String rootTag, Integer depth) {
        Datasource datasource = datasourcesApiService.getDatasource(datasourceId).orElseThrow(() -> new NotFoundException(HttpStatus.NOT_FOUND.value(),
                "Unable to find datasource with id " + datasourceId));
        logger.info("Fetching tags for datasource id {}", datasourceId);
        switch (datasource.getDatasourceType()) {
            case OPC_DA:
                return browseTagOpcDa(datasource, rootTag, depth);
            case OPC_UA:
                return browseTagOpcUa(datasource, rootTag, depth);
            default:
                throw new RuntimeException("Unknown datasource type" + datasource.getDatasourceType());
        }

    }

    private OpcDaConnectionProfile createOpcDaConnectionProfile(Datasource datasource) {
        try {
            return new OpcDaConnectionProfile()
                    .withComClsId(datasource.getClsid())
                    .withComProgId(datasource.getProgId())
                    .withDomain(datasource.getDomain())
                    .withCredentials(new UsernamePasswordCredentials()
                            .withUser(datasource.getUser())
                            .withPassword(datasource.getPassword()))
                    .withConnectionUri(new URI("opc.da://" + datasource.getHost()))
                    .withSocketTimeout(Duration.of(socketTimeoutMillis, ChronoUnit.MILLIS));
        } catch (URISyntaxException ex) {
            throw new IllegalArgumentException(String.format("Error while creating connection instance with host '%s'", datasource.getHost()), ex);
        }
    }

    private OpcUaConnectionProfile createOpcUaConnectionProfile(Datasource datasource) {
        return new OpcUaConnectionProfile()
                .withConnectionUri(URI.create(datasource.getHost()))//"opc.tcp://localhost:53530/OPCUA/SimulationServer"
                .withClientIdUri("none")//hurence:opc-simple:client:test
                .withClientName("Simple OPC test client")
                .withSocketTimeout(Duration.of(socketTimeoutMillis, ChronoUnit.MILLIS));
    }

    private List<Tag> browseTagOpcDa(Datasource datasource, String rootTag, Integer depth) throws IllegalArgumentException {
        OpcDaConnectionProfile connectionProfile = createOpcDaConnectionProfile(datasource);
        Map<String, Collection<OpcObjectInfo>> tagMap = (rootTag != null && depth != null) ?
                opcRepository.fetchTagNames(connectionProfile, rootTag, depth) :
                Collections.singletonMap(null, opcRepository.fetchAllTags(connectionProfile).stream().map(a -> (OpcObjectInfo) a).collect(Collectors.toList()));
        return tagMap.entrySet().stream()
                .flatMap(entry -> entry.getValue().stream().map(t -> Tuple2.apply(entry.getKey(), t)))
                .map(tuple -> convertOpcTagInfoToHistorianTag(tuple._2(), tuple._1(), datasource))
                .filter(tag -> tag != null)
                .collect(Collectors.toList());
    }

    private List<Tag> browseTagOpcUa(Datasource datasource, String rootTag, Integer depth) throws IllegalArgumentException {
        OpcUaConnectionProfile connectionProfile = createOpcUaConnectionProfile(datasource);
        Map<String, Collection<OpcObjectInfo>> tagMap = (rootTag != null && depth != null) ?
                opcRepository.fetchTagNames(connectionProfile, rootTag, depth) :
                Collections.singletonMap(null, opcRepository.fetchAllTags(connectionProfile).stream().map(a -> (OpcObjectInfo) a).collect(Collectors.toList()));
        return tagMap.entrySet().stream()
                .flatMap(entry -> entry.getValue().stream().map(t -> Tuple2.apply(entry.getKey(), t)))
                .map(tuple -> convertOpcTagInfoToHistorianTag(tuple._2(), tuple._1(), datasource))
                .filter(tag -> tag != null)
                .collect(Collectors.toList());
    }

    private Tag convertOpcTagInfoToHistorianTag(OpcObjectInfo opcObjectInfo, String root, Datasource datasource) {
        try {
            Tag t = new Tag()
                    .tagName(opcObjectInfo.getName())
                    .datasourceId(datasource.getId())
                    .id(opcObjectInfo.getId())
                    .dataType(null)
                    .recordType(opcObjectInfo instanceof OpcTagInfo ? "tag" : "folder");

            if (root != null) {
                t.setGroup(root);
            }
            if (opcObjectInfo.getDescription() != null && opcObjectInfo.getDescription().isPresent()) {
                t.setDescription(opcObjectInfo.getDescription().get().toString());
            }
            if (opcObjectInfo instanceof OpcTagInfo) {
                OpcTagInfo tmp = (OpcTagInfo) opcObjectInfo;
                t.setDataType(tmp.getType() != null ? mapDataType(tmp.getType()) : null);
                if (tmp.getScanRate() != null && tmp.getScanRate().isPresent()) {
                    t.setUpdateRate((int) tmp.getScanRate().get().toMillis());
                }

            }
            return t;
        } catch (Exception e) {
            logger.warn("Unable to parse tag " + opcObjectInfo.getName(), e);
            return null;
        }
    }

    @Autowired
    public void setDatasourcesApiService(DatasourcesApiService datasourcesApiService) {
        this.datasourcesApiService = datasourcesApiService;
    }

    @Autowired
    public void setOpcRepository(OpcRepository opcRepository) {
        this.opcRepository = opcRepository;
    }

    @Value("${opc.socket.timeout:15000}")
    public void setSocketTimeoutMillis(long socketTimeoutMillis) {
        this.socketTimeoutMillis = socketTimeoutMillis;
    }
}


