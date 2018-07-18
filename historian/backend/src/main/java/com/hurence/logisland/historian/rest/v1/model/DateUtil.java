package com.hurence.logisland.historian.rest.v1.model;

import org.threeten.bp.OffsetDateTime;
import org.threeten.bp.format.DateTimeFormatter;

public final class DateUtil {

    private DateUtil() {}

    public static String toUtcDateForSolr(OffsetDateTime date) {
        return date.format(DateTimeFormatter.ISO_INSTANT);
    }

}
