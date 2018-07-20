package com.hurence.logisland.historian.rest.v1.model.operation_report;

import java.util.Optional;

public class AbstractReplaceReport<T> implements ReplaceReport<T> {

    private T item;
    private boolean created;

    public AbstractReplaceReport(T item, boolean created) {
        this.item = item;
        this.created = created;
    }

    @Override
    public Optional<T> getItem() {
        return Optional.of(this.item);
    }

    @Override
    public boolean isCreated() {
        return this.created;
    }
}
