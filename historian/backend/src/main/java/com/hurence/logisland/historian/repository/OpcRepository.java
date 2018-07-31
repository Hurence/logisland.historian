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

package com.hurence.logisland.historian.repository;

import com.hurence.opc.OpcContainerInfo;
import com.hurence.opc.OpcObjectInfo;
import com.hurence.opc.OpcOperations;
import com.hurence.opc.OpcTagInfo;
import com.hurence.opc.da.OpcDaConnectionProfile;
import com.hurence.opc.da.OpcDaOperations;
import com.hurence.opc.da.OpcDaTemplate;
import com.hurence.opc.ua.OpcUaConnectionProfile;
import com.hurence.opc.ua.OpcUaOperations;
import com.hurence.opc.ua.OpcUaTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * OPC repository access stub.
 *
 * @author amarziali
 */
@Repository
@Validated
public class OpcRepository {

    private static final Logger logger = LoggerFactory.getLogger(OpcRepository.class);


    /**
     * Fetches all tags available on a OPC-DA server.
     *
     * @param connectionProfile the connection information.
     * @return a never empty {@link Collection}
     */
    public Collection<OpcTagInfo> fetchAllTags(@Valid OpcDaConnectionProfile connectionProfile) {
        OpcDaOperations opcDaOperations = new OpcDaTemplate();
        try {
            opcDaOperations.connect(connectionProfile);
            if (!opcDaOperations.awaitConnected()) {
                logger.error("Unable to fetch tags from opc server {}.Please check your connectivity and your settings", connectionProfile.getConnectionUri());
                return Collections.emptyList();
            }
            return opcDaOperations.browseTags();
        } finally {
            opcDaOperations.disconnect();
        }
    }

    /**
     * Fetch tag names browsing the tree till the specified depth.
     *
     * @param connectionProfile the connection profile
     * @param rootTagId         the root tag the browse should begin from.
     * @param depth             the depth
     * @return a map whose key is the root and the value is the children of the root.
     */
    public Map<String, Collection<OpcObjectInfo>> fetchTagNames(OpcUaConnectionProfile connectionProfile, String rootTagId, int depth) {
        Map<String, Collection<OpcObjectInfo>> ret = new HashMap<>();
        try (OpcOperations opcUaTemplate = createOpcUaTemplate(connectionProfile)) {
            doFetchTag(opcUaTemplate, rootTagId, depth, ret);
        } catch (Exception e) {
            throw new RuntimeException("Unable to fetch tag names", e);
        }
        return ret;
    }

    /**
     * Fetch tag names browsing the tree till the specified depth.
     *
     * @param connectionProfile the connection profile
     * @param rootTagId         the root tag the browse should begin from.
     * @param depth             the depth
     * @return a map whose key is the root and the value is the children of the root.
     */
    public Map<String, Collection<OpcObjectInfo>> fetchTagNames(OpcDaConnectionProfile connectionProfile, String rootTagId, int depth) {
        Map<String, Collection<OpcObjectInfo>> ret = new HashMap<>();
        try (OpcOperations opcDaTemplate = createOpcDaTemplate(connectionProfile)) {
            doFetchTag(opcDaTemplate, rootTagId, depth, ret);
        } catch (Exception e) {
            throw new RuntimeException("Unable to fetch tag names", e);
        }
        return ret;
    }

    private void doFetchTag(OpcOperations opcOperations, String currentRoot, int remaining, Map<String, Collection<OpcObjectInfo>> result) {
        if (remaining <= 0) {
            return;
        }
        Collection<OpcObjectInfo> info = opcOperations.fetchNextTreeLevel(currentRoot);
        if (info.isEmpty()) {
            return;
        }
        result.put(currentRoot, info);
        info.stream().filter(opcObjectInfo -> opcObjectInfo instanceof OpcContainerInfo)
                .forEach(opcObjectInfo -> doFetchTag(opcOperations, opcObjectInfo.getId(), remaining - 1, result));

    }

    /**
     * Fetch metadata
     *
     * @param connectionProfile the connection profile
     * @param tagId             the tag id.
     * @return the tag metadata or an exception is something wrong.
     */
    public OpcTagInfo fetchTagMetadata(OpcUaConnectionProfile connectionProfile, String tagId) {
        try (OpcUaOperations opcUaTemplate = createOpcUaTemplate(connectionProfile)) {
            return opcUaTemplate.fetchMetadata(tagId).stream().findFirst().orElseThrow(() -> new RuntimeException("No metadata found"));
        } catch (Throwable e) {
            throw new RuntimeException("Unable to fetch metadata for tag " + tagId, e);
        }
    }

    /**
     * Fetch metadata
     *
     * @param connectionProfile the connection profile
     * @param tagId             the tag id.
     * @return the tag metadata or an exception is something wrong.
     */
    public OpcTagInfo fetchTagMetadata(OpcDaConnectionProfile connectionProfile, String tagId) {
        try (OpcDaOperations opcDaTemplate = createOpcDaTemplate(connectionProfile)) {
            return opcDaTemplate.fetchMetadata(tagId).stream().findFirst().orElseThrow(() -> new RuntimeException("No metadata found"));
        } catch (Throwable e) {
            throw new RuntimeException("Unable to fetch metadata for tag " + tagId, e);
        }
    }

    private OpcUaOperations createOpcUaTemplate(OpcUaConnectionProfile connectionProfile) {
        OpcUaOperations ret = new OpcUaTemplate();
        ret.connect(connectionProfile);
        if (!ret.awaitConnected()) {
            throw new RuntimeException("Unable to connect to OPC-UA server " + connectionProfile.getConnectionUri());
        }
        return ret;
    }


    private OpcDaOperations createOpcDaTemplate(OpcDaConnectionProfile connectionProfile) {
        OpcDaOperations ret = new OpcDaTemplate();
        ret.connect(connectionProfile);
        if (!ret.awaitConnected()) {
            throw new RuntimeException("Unable to connect to OPC-DA server " + connectionProfile.getConnectionUri());
        }
        return ret;
    }


    /**
     * Fetches all tags available on a OPC-DA server.
     *
     * @param connectionProfile the connection information.
     * @return a never empty {@link Collection}
     */
    public Collection<OpcTagInfo> fetchAllTags(@Valid OpcUaConnectionProfile connectionProfile) {
        OpcUaOperations opcUaOperations = new OpcUaTemplate();
        try {
            opcUaOperations.connect(connectionProfile);
            if (!opcUaOperations.awaitConnected()) {
                logger.error("Unable to fetch tags from opc server {}.Please check your connectivity and your settings", connectionProfile.getConnectionUri());
                return Collections.emptyList();
            }
            return opcUaOperations.browseTags();
        } finally {
            opcUaOperations.disconnect();
        }
    }
}
