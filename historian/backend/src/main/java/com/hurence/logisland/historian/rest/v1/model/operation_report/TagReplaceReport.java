package com.hurence.logisland.historian.rest.v1.model.operation_report;

import com.hurence.logisland.historian.rest.v1.model.Tag;

public class TagReplaceReport  extends AbstractReplaceReport<Tag> {

    public TagReplaceReport(Tag tag, boolean created) {
        super(tag, created);
    }
}
