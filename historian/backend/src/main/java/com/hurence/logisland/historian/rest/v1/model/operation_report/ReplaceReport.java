package com.hurence.logisland.historian.rest.v1.model.operation_report;

import java.util.Optional;

public interface ReplaceReport<T> {

    Optional<T> getItem();

    boolean isCreated();
}
