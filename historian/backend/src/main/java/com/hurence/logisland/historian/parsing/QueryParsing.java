package com.hurence.logisland.historian.parsing;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.Optional;

public final class QueryParsing {

    private final static Logger logger = LoggerFactory.getLogger(QueryParsing.class);

    private QueryParsing() {
    }

    /**
     *
     * @param sortParam should be of the form <field name> <direction>[,<field name> <direction>]
     *                  - with field name being a valid field name.
     *                  - with direction being ASC or DESC (case insensitive).
     * @return The equivalent Sort spring data object.
     * @throws IllegalArgumentException if sortParam is not as expected
     */
    public static Sort parseSortParam(String sortParam) {
        //TODO should use regex so that we can use a field name with comma or space in it using '"'.
        if (sortParam == null || sortParam.isEmpty()) throw new IllegalArgumentException("sortParam is null or empty");
        String[] sortElems = sortParam.split(",");
        Optional<Sort> sort = Arrays.stream(sortElems)
                .map(QueryParsing::parseSortElem)
                .reduce((s1, s2) -> s1.and(s2));
        if (sort.isPresent()) return  sort.get();
        logger.warn("returning unsorted sort");
        return Sort.unsorted();
    }

    private static Sort parseSortElem(String sortElem) {
        String[] fieldDirectionPair = sortElem.split(" ");
        if (fieldDirectionPair.length != 2) {
            throw new IllegalArgumentException("fieldDirectionPair contain multiple space and this is not currently supported");
        }
        return Sort.by(Sort.Direction.fromString(fieldDirectionPair[1]), fieldDirectionPair[0]);
    }


}