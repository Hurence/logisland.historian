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
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class TagsApiService {


    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private static final String TAGS_LIST = "tags";

    @Resource
    private SolrTagRepository repository;

    @Resource(name = "solrTemplate")
    private SolrTemplate solrTemplate;


    // inject the template as ListOperations
    @Resource(name = "redisTemplate")
    private ListOperations<String, Object> listOps;




    public Optional<Tag> deleteTag(String itemId) {

        logger.info("deleting Tag " + itemId);
        Tag tagToRemove = solrTemplate.getById(itemId, Tag.class);
        if (tagToRemove != null) {
            repository.delete(itemId);
            return Optional.of(tagToRemove);
        } else
            return Optional.empty();

    }


    public Optional<Tag> getTag(String itemId) {
        logger.debug("getting Tag " + itemId);
        Tag tag = solrTemplate.getById(itemId, Tag.class);
        if (tag != null) {
            return Optional.of(tag);
        } else {
            logger.debug("Tag " + itemId + " not found");
            return Optional.empty();
        }
    }


    public Optional<Tag> updateTag(Tag tag) {
        logger.debug("updating Tag " + tag.getId());
        Optional<Tag> tagToUpdate = getTag(tag.getId());
        if (tagToUpdate.isPresent()) {
            solrTemplate.saveBean(tag);
            return Optional.of(tag);
        } else {
            logger.error("Tag " + tag.getId() + " not found, unable to update");
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

        logger.info(query);

        List<Tag> tags = repository.findByText(query);//, new PageRequest(0, 20));

        return tags;//.getContent();


    }

    public Optional<Tag> addTagWithId(Tag body, String itemId) {

        logger.info("Tag already {} exists, delete it first", itemId);

        Tag tagToRemove = solrTemplate.getById(itemId, Tag.class);
        if (tagToRemove != null) {
            return Optional.empty();
        } else {

            body.setId(itemId);
            // body.id( "/" + body.getDomain() + "/" + body.getServer() + "/" + body.getGroup() + "/" + body.getTagName())
            repository.save(body);
            return Optional.of(body);
        }

    }

}