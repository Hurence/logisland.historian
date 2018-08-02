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
import com.hurence.logisland.historian.rest.v1.model.TreeNode;
import com.hurence.logisland.historian.rest.v1.model.operation_report.ReplaceReport;
import com.hurence.logisland.historian.rest.v1.model.operation_report.TagReplaceReport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.solr.core.query.result.FacetPage;
import org.springframework.data.solr.core.query.result.FacetPivotFieldEntry;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TagsApiService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private SolrTagRepository repository;

    private DataflowsApiService dataflowsApiService;

    @Autowired
    public void setDataflowsApiService(DataflowsApiService dataflowsApiService) {
        this.dataflowsApiService = dataflowsApiService;
    }


    public Optional<Tag> deleteTag(String id_) {
        Optional<Tag> tagToRemove = this.deleteTagWithoutGeneratingConf(id_);
        if (tagToRemove.isPresent()) {
            dataflowsApiService.updateOpcDataflow();
        }
        return tagToRemove;
    }

    private Optional<Tag> deleteTagWithoutGeneratingConf(String id_) {
        logger.info("deleting Tag {}", id_);
        Optional<Tag> tagToRemove = repository.findById(id_);
        if (tagToRemove.isPresent()) {
            repository.delete(tagToRemove.get());
        }
        return tagToRemove;
    }

    public Optional<Tag> getTag(String id_) {
        logger.debug("getting Tag {}", id_);
        return repository.findById(id_);
    }

    private ReplaceReport<Tag> createOrReplaceATag(Tag tag) {
        logger.debug("create or replace Tag {}", tag.getId());
        Optional<Tag> tagToReplace = repository.findByIdAndDatasourceId(tag.getId(), tag.getDatasourceId());
        if (tagToReplace.isPresent()) {
            Tag savedTag = updateTag(tag, tagToReplace.get().getId_());
            return new TagReplaceReport(savedTag, false);
        } else {
            Tag savedTag = saveTag(tag);
            return new TagReplaceReport(savedTag, true);
        }
    }

    public ReplaceReport<Tag> createOrReplaceATag(Tag tag, String itemId) {
        ReplaceReport<Tag> report;
        if (!tag.getId().equals(itemId)) {
            report = createOrReplaceATag(tag.id(itemId));
        } else {
            report = createOrReplaceATag(tag);
        }
        dataflowsApiService.updateOpcDataflow();
        return report;
    }

    public List<Tag> getAllTags(String fq) {
        String query = fq;
        if (fq == null || fq.isEmpty())
            query = "*";
        List<Tag> tags = repository.findByText(query);
        return tags;
    }

    public List<Tag> getAllTagsFromDatasource(String datasourceId) {
        return repository.findByDatasource(datasourceId);
    }

    public List<Tag> getAllEnabledTagsFromDatasource(String datasourceId) {
        return repository.findByAllEnabledFromDatasource(datasourceId);
    }

    public List<TreeNode> getTreeTag(int page, int limit) {
        FacetPage<Tag> facet = repository.findTreeFacetOnDomainThenServerThenGroup(PageRequest.of(page, limit));
        List<FacetPivotFieldEntry> domainPiv = facet.getPivot("domain,server,group");
        return buildTreeNodes(domainPiv);
    }

    public List<TreeNode> buildTreeNodes(List<FacetPivotFieldEntry> facetPivotFields) {
        return facetPivotFields.stream()
                .map(this::buildTreeNode)
                .collect(Collectors.toList());
    }

    public TreeNode buildTreeNode(FacetPivotFieldEntry facetPivot) {
        TreeNode node = new TreeNode();
        node.setValue(facetPivot.getValue());
        node.setTotalChildNumber(facetPivot.getValueCount());
        List<TreeNode> children = buildTreeNodes(facetPivot.getPivot());
        node.setChildren(children);
        return node;
    }

    /**
     *
     * @param tags
     * @return true if all items were created. If at least one tag was updated (existed before), it returns false.
     */
    public List<Tag> SaveOrUpdateMany(List<Tag> tags) {
        List<Tag> updatedTags = tags.stream().map(tag -> createOrReplaceATag(tag).getItem())
                .flatMap(o -> o.isPresent() ? Stream.of(o.get()) : Stream.empty())
                .collect(Collectors.toList());
        dataflowsApiService.updateOpcDataflow();
        return updatedTags;
    }

    public List<Tag> deleteManyTag(List<String> tagIds) {
        List<Tag> supressedTags = tagIds.stream().map(id -> this.deleteTagWithoutGeneratingConf(id))
                .flatMap(o -> o.isPresent() ? Stream.of(o.get()) : Stream.empty())
                .collect(Collectors.toList());
        dataflowsApiService.updateOpcDataflow();
        return supressedTags;
    }

    public Tag saveTag(Tag tag) {
        tag.setId_(UUID.randomUUID().toString());
        return repository.save(tag);
    }

    public Tag updateTag(Tag tag, String id_) {
        tag.setId_(id_);
        return repository.save(tag);
    }

}