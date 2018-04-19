/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.hurence.logisland.historian.service;

import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.opc.OpcData;
import com.hurence.opc.OpcOperations;
import com.hurence.opc.da.OpcDaConnectionProfile;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {


    private final OpcOperations<OpcDaConnectionProfile, OpcData> opcOperations;

    /**
     * Constructor.
     *
     * @param opcOperations to be autowired by spring.
     */
    public TagService(OpcOperations<OpcDaConnectionProfile, OpcData> opcOperations) {
        this.opcOperations = opcOperations;
    }

    /**
     * Returns the list of available tags.
     * @return
     */
    public List<Tag> getTags() {
        return opcOperations.browseTags().stream()
                .map(s -> {
                    Tag ret = new Tag();
                    ret.setItemName(s);
                    return ret;
                }).collect(Collectors.toList());
    }
}