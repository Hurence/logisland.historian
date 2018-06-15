package com.hurence.logisland.historian.repository;

import com.hurence.logisland.historian.rest.v1.model.Selection;
import org.springframework.data.solr.repository.SolrCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolrSelectionRepository extends SolrCrudRepository<Selection, String> {

}