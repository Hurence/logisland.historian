package com.hurence.logisland.historian.rest.v1.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class Id implements Serializable {
    @JsonProperty("id")
    private String id;

    @JsonProperty("id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
