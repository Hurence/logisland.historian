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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TagsService {


    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private static final String TAGS_LIST = "tags";

    @Resource
    private SolrTagRepository repository;

    @Resource(name = "solrTemplate")
    private SolrTemplate solrTemplate;


    // inject the template as ListOperations
    @Resource(name = "redisTemplate")
    private ListOperations<String, Object> listOps;


    public List<Tag> findAll() {


        long tagsCount = 10 - listOps.size(TAGS_LIST);

        while (tagsCount > 0) {
            Tag t = new Tag()
                    .domain("hurence")
                    .server("opc-server1")
                    .group("sensors.temperature")
                    .tagName("TEMP00" + tagsCount)
                    .id("/hurence/opc-server1/sensors.temperature/TEMP00" + tagsCount);
            //  repository.save(t);

            listOps.leftPush(TAGS_LIST, t);
            repository.save(t);
            tagsCount--;
        }


        Tag tag = solrTemplate.getById("/hurence/opc-server1/sensors.temperature/TEMP008", Tag.class);


        List<Tag> tags = repository.findByDomain("hurence");//, new PageRequest(1, 20) );

        logger.info(tag.toString());

        /*


        List<Tag> tags = listOps.range(TAGS_LIST, 0, tagsCount - 1)
                .stream()
                .map(Tag.class::cast)
                .collect(Collectors.toList());*/

        return tags;//.getContent();
    }


    public List<Tag> getAllTags(String fq) {

        String query = fq;
        if(fq == null || fq.isEmpty())
            query = "*:*";

        Page<Tag> tags = repository.findAll(new PageRequest(0,20));

        return tags.getContent();


    }
/*
    public Response addTagWithId(Tag body, String itemId, SecurityContext securityContext) {



        Tag tagToRemove = solrTemplate.getById(itemId, Tag.class);
        if (tagToRemove != null) {
            return Response.status(Response.Status.BAD_REQUEST).entity(new ApiResponseMessage(ApiResponseMessage.ERROR, "item already exists")).build();
        } else{

            body.setId(itemId);
           // body.id( "/" + body.getDomain() + "/" + body.getServer() + "/" + body.getGroup() + "/" + body.getTagName())
            repository.save(body);
            return Response.ok().entity(body).build();
        }





    }



    public Response deleteTag(String itemId, SecurityContext securityContext) {


        Tag tagToRemove = solrTemplate.getById(itemId, Tag.class);
        if (tagToRemove != null) {
            repository.delete(itemId);
            return Response.ok().entity(tagToRemove).build();
        } else
            return Response.status(Response.Status.NOT_FOUND).build();


    }




    public Response getTag(String itemId, SecurityContext securityContext) {
        return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!")).build();
    }

    public Response updateTag(String itemId, Tag tag, SecurityContext securityContext) {
        return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!")).build();
    }*/
}