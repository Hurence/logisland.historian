package com.hurence.logisland.historian.rest.v1.model.operation_report;

import com.hurence.logisland.historian.rest.v1.model.Datasource;

public class DatasourceReplaceReport extends AbstractReplaceReport<Datasource> {

    public DatasourceReplaceReport(Datasource datasource, boolean created) {
        super(datasource, created);
    }
}
