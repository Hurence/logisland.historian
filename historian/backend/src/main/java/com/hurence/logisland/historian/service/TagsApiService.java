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

import com.hurence.logisland.historian.repository.SolrTagRepository;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class TagsApiService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private SolrTagRepository repository;


    public Optional<Tag> deleteTag(String itemId) {
        logger.info("deleting Tag {}", itemId);
        Optional<Tag> tagToRemove = repository.findById(itemId);
        if (tagToRemove.isPresent()) {
            repository.delete(tagToRemove.get());
        }
        return tagToRemove;
    }


    public Optional<Tag> getTag(String itemId) {
        logger.debug("getting Tag {}", itemId);
        return repository.findById(itemId);
    }


    public Optional<Tag> updateTag(Tag tag) {
        logger.debug("updating Tag {}", tag.getId());
        if (repository.existsById(tag.getId())) {
            return Optional.of(repository.save(tag));
        } else {
            logger.error("Tag {} not found, unable to update", tag.getId());
            return Optional.empty();
        }
    }

    public Optional<Tag> updateTag(Tag tag, String itemId) {
        if (!tag.getId().equals(itemId)) {
            return updateTag(tag.id(itemId));
        } else {
            return updateTag(tag);
        }
    }

    public List<Tag> getAllTags(String fq) {
        String query = fq;
        if (fq == null || fq.isEmpty())
            query = "*";
        List<Tag> tags = repository.findByText(query);
        return tags;
    }

    public Optional<Tag> addTagWithId(Tag body, String itemId) {

        logger.info("Tag already {} exists, delete it first", itemId);

        if (repository.existsById(itemId)) {
            body.setId(itemId);
            return Optional.of(repository.save(body));
        }
        return Optional.empty();

    }

}