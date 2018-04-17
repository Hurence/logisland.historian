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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.solr.repository.Query;
import org.springframework.data.solr.repository.SolrCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolrTagRepository extends SolrCrudRepository<Tag, String> {

    List<Tag> findById(String id);

    // catch all query
    List<Tag> findByText(String text);

   // long count(String searchTerm);

    @Query(fields = { "id", "tag_name", "group", "domain", "server", "creation_date" })
    Page<Tag> findAll(Pageable page);

    //Derived Query will be "q=popularity:<popularity>&start=<page.number>&rows=<page.size>"
    //@Query(fields = { "id", "tag_name", "domain", "server" })
    List<Tag> findByDomain(String domain);

    List<Tag> findByGroup(String group);


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