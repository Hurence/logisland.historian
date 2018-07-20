package com.hurence.logisland.historian.rest.v1.model;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Objects;

public class JacksonConverter {
    private final static JacksonConverter instance = new JacksonConverter();

    public final static JacksonConverter instance() {
        return instance;
    }

    private ObjectMapper objectMapper;

    private JacksonConverter() {
        this.objectMapper = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
//        this.objectMapper.setDateFormat(new SimpleDateFormat(Dates.ISO_DATE_FORMAT));
    }
    public TypeFactory getTypeFactory() {
        return objectMapper.getTypeFactory();
    }

    public <T> T fromValue(Object value, Class<T> expectedClass) {
        return objectMapper.convertValue(value, expectedClass);
    }

    public <T> T fromJson(String json, Class<T> expectedClass) {
        Objects.requireNonNull(json);
        Objects.requireNonNull(expectedClass);

        try {
            return objectMapper.readValue(json, expectedClass);
        }
        catch(Exception e) {
            throw new RuntimeException("could not convert json to " + expectedClass.getName(), e);
        }
    }

    public <T> T fromJson(String json, Class<? extends Collection> collectionClass, Class<?> elementClass) {
        Objects.requireNonNull(json);
        Objects.requireNonNull(collectionClass);
        Objects.requireNonNull(elementClass);

        JavaType customClassCollection = getTypeFactory().constructCollectionType(collectionClass, elementClass);

        try {
            return objectMapper.readValue(json, customClassCollection);
        }
        catch(Exception e) {
            throw new RuntimeException("could not convert json to " + customClassCollection.getClass().getName(), e);
        }
    }

    public String toJson(Object value) {
        Objects.requireNonNull(value);

        try {
            return objectMapper.writeValueAsString(value);
        }
        catch (Exception e) {
            throw new RuntimeException("could not convert value to json", e);
        }
    }

}