/*
 * Copyright (C) 2018 Hurence (support@hurence.com)
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

package com.hurence.logisland.historian.rest.v1.api;

import com.hurence.logisland.historian.rest.v1.model.Measures;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.rest.v1.model.grafana.Query;
import com.hurence.logisland.historian.rest.v1.model.grafana.QueryResponse;
import com.hurence.logisland.historian.rest.v1.model.grafana.Target;
import com.hurence.logisland.historian.rest.v1.model.grafana.TextValue;
import com.hurence.logisland.historian.service.MeasuresApiService;
import com.hurence.logisland.historian.service.TagsApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/grafana")
public class GrafanaApiController {

    private static final Pattern DS_PATTERN = Pattern.compile("(.*)\\((.*)\\)");
    private static final String TAG_DATASOURCE_FORMAT = "%s (%s)";

    @Autowired
    private TagsApiService tagsApiService;

    @Autowired
    private MeasuresApiService measuresApiService;


    @GetMapping
    public ResponseEntity<Void> status() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/annotations")
    public ResponseEntity<Void> annotations() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/search")
    public List<TextValue> search(@RequestBody Target target) {
        return tagsApiService.getAllTagsWithNodeIdLike(target.getTarget(), Optional.of(15))
                .stream()
                .map(t -> (String.format(TAG_DATASOURCE_FORMAT, t.getNodeId(), t.getDatasourceId())))
                .map(s -> new TextValue(s, s))
                .collect(Collectors.toList());
    }

    @PostMapping("/query")
    public List<QueryResponse> query(@RequestBody Query query) {
        Map<String, Tag> mapping = tagsApiService.getAllTags(null, Optional.empty(), Optional.empty()).stream()
                .collect(Collectors.toMap(t -> String.format(TAG_DATASOURCE_FORMAT, t.getNodeId(), t.getDatasourceId()),
                        Function.identity()));
        Set<String> filters =  query.getTargets().stream().map(Target::getTarget).collect(Collectors.toSet());
        Map<String, Optional<Measures>> result = mapping.entrySet()
                .stream()
                .filter(e -> filters.contains(e.getKey()))
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> measuresApiService.getTagMeasures(e.getValue().getNodeId(), e.getValue().getDatasourceId(),
                                query.getRange().getFrom(), query.getRange().getTo(), "savgint:" + query.getIntervalMs() +"," + query.getMaxDataPoints(),
                                false)
                ));
        return result.entrySet()
                .stream()
                .filter(e -> e.getValue().isPresent())
                .map(e -> {
                    QueryResponse ret = new QueryResponse();
                    ret.setTarget(e.getKey());
                    Measures tmp = e.getValue().get();
                    for (int i = 0; i < tmp.getNumPoints(); i++) {
                        ret.getDatapoints().add(new Number[]{tmp.getValues().get(i), tmp.getTimestamps().get(i)});
                    }
                    return ret;
                }).collect(Collectors.toList());

    }
}
