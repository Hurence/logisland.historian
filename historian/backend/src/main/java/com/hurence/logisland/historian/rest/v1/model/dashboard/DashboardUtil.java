package com.hurence.logisland.historian.rest.v1.model.dashboard;

import com.hurence.logisland.historian.rest.v1.model.*;

import java.util.List;

public final class DashboardUtil {

    private DashboardUtil() {
    }

    private final static JacksonConverter converter = JacksonConverter.instance();

    public static Dashboard convertDfstoDf(DashboardJson dbj) {
        Dashboard db = new Dashboard();
        db.id(dbj.getId());
        db.setAutorefresh(dbj.getAutorefresh());
        db.setDescription(dbj.getDescription());
        db.setFrom(dbj.getFrom());
        db.setName(dbj.getName());
        db.setOwner(dbj.getOwner());
        db.setPanels(converter.fromJson(dbj.getPanels(), List.class, Gauge.class));
        db.setPermissions(dbj.getPermissions());
        db.setTo(dbj.getTo());
        return db;
    }

    public static DashboardJson convertDftoDfs(Dashboard db) {
        DashboardJson dbj = new DashboardJson();
        dbj.id(db.getId());
        dbj.setAutorefresh(db.getAutorefresh());
        dbj.setDescription(db.getDescription());
        dbj.setFrom(db.getFrom());
        dbj.setName(db.getName());
        dbj.setOwner(db.getOwner());
        dbj.setPanels(converter.toJson(db.getPanels()));
        dbj.setPermissions(db.getPermissions());
        dbj.setTo(db.getTo());
        return dbj;
    }
}
