package com.hurence.logisland.historian.rest.v1.model;

import java.util.Optional;

public class TagReplaceReport {
    public Optional<Tag> tag;
    public boolean created;


    public TagReplaceReport(Optional<Tag> tag, boolean created) {
        this.tag = tag;
        this.created = created;
    }
}
