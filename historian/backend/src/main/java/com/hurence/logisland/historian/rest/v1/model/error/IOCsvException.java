package com.hurence.logisland.historian.rest.v1.model.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class IOCsvException extends RuntimeException {
    public IOCsvException(String exception) {
        super(exception);
    }
}
