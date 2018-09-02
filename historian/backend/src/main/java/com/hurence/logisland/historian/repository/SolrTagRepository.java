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
package com.hurence.logisland.historian.repository;

import com.hurence.logisland.historian.rest.v1.model.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.solr.core.query.result.FacetPage;
import org.springframework.data.solr.repository.Facet;
import org.springframework.data.solr.repository.Pivot;
import org.springframework.data.solr.repository.Query;
import org.springframework.data.solr.repository.SolrCrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Repository
public interface SolrTagRepository extends SolrCrudRepository<Tag, String> {

    /* Delete queries */
    long deleteByDatasourceId(String datasource_id);

    /* Search queries */

    @Query(value = "*:*", filters = { "node_id:\"?0\"", "datasource_id:\"?1\"", "record_type:tag" })
    Optional<Tag> findByNodeIdAndDatasourceId(String nodeId, String datasource_id);

    // catch all query
    @Query(value = "*:*", filters = { "?0", "record_type:tag" })
    List<Tag> findByText(String text);

    // catch all query
    @Query(value = "*:*", filters = { "?0", "record_type:tag" })
    List<Tag> findByText(String text, Sort sort);

    // catch all query
    @Query(value = "*:*", filters = { "?0", "record_type:tag" })
    List<Tag> findByText(String text, Pageable page);

    @Query(value = "record_type:tag", filters = { "record_type:tag", "domain:?0"})
    List<Tag> findByDomain(String domain);

    @Query(value = "record_type:tag", filters = { "record_type:tag", "datasource_id:\"?0\""})
    List<Tag> findByDatasource(String datasource_id);

    @Query(value = "record_type:tag", filters = { "record_type:tag", "datasource_id:\"?0\"", "enabled:true"})
    List<Tag> findByAllEnabledFromDatasource(String datasource_id);

    @Query(value = "record_type:tag", filters = { "record_type:tag", "domain:?0", "server:?1"})
    List<Tag> findByDomainAndServer(String domain, String server);

    @Query(value = "record_type:tag", filters = { "record_type:tag", "domain:?0", "server:?1", "group:?2" })
    List<Tag> findByDomainAndServerAndGroup(String domain, String server, String group);

    @Query(value = "record_type:tag")
    @Facet(fields = { "domain" }, limit = 100)
    FacetPage<Tag> findAllFacetOnDomain(Pageable page);

    @Query(value = "record_type:tag", filters = { "record_type:tag", "domain:?0" })
    @Facet(fields = { "server" }, limit = 100)
    FacetPage<Tag> findAllFacetOnServerKnowingDomain(String domain, Pageable page);

    @Query(value = "record_type:tag", filters = { "record_type:tag", "domain:?0", "server:?1" })
    @Facet(fields = { "group" }, limit = 100)
    FacetPage<Tag> findAllFacetOnGroupKnowingDomainAndServer(String domain, String server, Pageable page);

    /* Facet queries */

    @Query(value = "record_type:tag", filters = { "record_type:tag" })
    @Facet(pivots = @Pivot({ "datasource_id", "group" }), pivotMinCount = 1, limit = 10000)
    FacetPage<Tag> findTreeFacetOnDatasourceIdThenGroup(Pageable page);

    @Query(value = "record_type:tag", filters = { "record_type:tag" })
    @Facet(pivots = @Pivot({ "domain", "server", "group" }), pivotMinCount = 1, limit = 100)
    FacetPage<Tag> findTreeFacetOnDomainThenServerThenGroup(Pageable page);

    @Query(value = "record_type:tag", filters = { "?0", "record_type:tag" })
    @Facet(pivots = @Pivot({ "domain", "server", "group" }), pivotMinCount = 0, limit = 100)
    FacetPage<Tag> findTreeFacetOnDomainThenServerThenGroup(String queryFilter, Pageable page);

    @Query(value = "record_type:tag", filters = { "record_type:tag", "domain:?0" })
    @Facet(pivots = @Pivot({ "server", "group" }), pivotMinCount = 0, limit = 100)
    FacetPage<Tag> findTreeFacetOnServerThenGroupKnowingDomain(String domain, Pageable page);

    @Query(value = "record_type:tag", filters = { "?1", "record_type:tag", "domain:?0" })
    @Facet(pivots = @Pivot({ "server", "group" }), pivotMinCount = 0, limit = 100)
    FacetPage<Tag> findTreeFacetOnServerThenGroupKnowingDomain(String domain, String queryFilter, Pageable page);

//    @Facet(pivots = @Pivot({ "category", "dimension" }, pivotMinCount = 0))
//    FacetPage<Product> findByTitle(String title, Pageable page);

//    @Query(value = "*:*")
//    @Facet(fields = { "group" }, limit=10000)
////    @Facet(pivotFields={"type,status"}, limit=10000)
//    FacetPage<Tag> findAllAndFacetByLocation(Pageable pageable);

    // catch all query
   // @Query(value = "*:*", filters = { "text:?0" })
    Long countByText(String text);

   // long count(String searchTerm);

    // Will execute count prior to determine total number of elements
    // Derived Query will be "q=id:<id>*&start=0&rows=<result of count query for q=name:<name>>"
    List<Tag> findByIdStartingWith(String id);

/*
    //Derived Query will be "q=inStock:true&start=<page.number>&rows=<page.size>"
    Page<Tag> findByAvailableTrue(Pageable page);

    //Derived Query will be "q=inStock:<inStock>&start=<page.number>&rows=<page.size>"
    @Query("inStock:?0")
    Page<Tag> findByAvailableUsingAnnotatedQuery(boolean inStock, Pageable page);

    //Will execute count prior to determine total number of elements
    //Derived Query will be "q=inStock:false&start=0&rows=<result of count query for q=inStock:false>&sort=name desc"
    List<Tag> findByAvailableFalseOrderByNameDesc();

    //Execute faceted search 
    //Query will be "q=name:<name>&facet=true&facet.field=cat&facet.limit=20&start=<page.number>&rows=<page.size>"
    @Query(value = "name:?0")
    @Facet(fields = { "cat" }, limit=20)
    FacetPage<Tag> findByNameAndFacetOnCategory(String name, Pageable page);

    //Boosting criteria
    //Query will be "q=name:<name>^2 OR description:<description>&start=<page.number>&rows=<page.size>"
    Page<Tag> findByNameOrDescription(@Boost(2) String name, String description, Pageable page);

    //Highlighting results
    //Query will be "q=name:(<name...>)&hl=true&hl.fl=*"
    @Highlight
    HighlightPage<Tag> findByNameIn(Collection<String> name, Pageable page);

    //Spatial Search
    //Query will be "q=location:[<bbox.start.latitude>,<bbox.start.longitude> TO <bbox.end.latitude>,<bbox.end.longitude>]"
    Page<Tag> findByLocationNear(Box bbox);

    //Spatial Search
    //Query will be "q={!geofilt pt=<location.latitude>,<location.longitude> sfield=location d=<distance.value>}"
    Page<Tag> findByLocationWithin(Point location, Distance distance);

    List<Tag> findByAuthorLike(String author);
*/
}