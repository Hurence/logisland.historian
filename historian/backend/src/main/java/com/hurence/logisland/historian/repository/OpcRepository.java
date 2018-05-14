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

import com.hurence.opc.OpcTagInfo;
import com.hurence.opc.da.OpcDaConnectionProfile;
import com.hurence.opc.da.OpcDaOperations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Collections;

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
        OpcDaOperations opcDaOperations = new OpcDaOperations();
        try {
            opcDaOperations.connect(connectionProfile);
            if (!opcDaOperations.awaitConnected()) {
                logger.error("Unable to fetch tags from opc server {}.Please check your connectivity and your settings", connectionProfile.getHost());
                return Collections.emptyList();
            }
            return opcDaOperations.browseTags();
        } finally {
            opcDaOperations.disconnect();
        }
    }

}
