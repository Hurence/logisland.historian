package com.hurence.logisland.historian.rest.v1.model.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class ConvertionFieldCsvException extends RuntimeException {
    public ConvertionFieldCsvException(String exception) {
        super(exception);
    }
}
