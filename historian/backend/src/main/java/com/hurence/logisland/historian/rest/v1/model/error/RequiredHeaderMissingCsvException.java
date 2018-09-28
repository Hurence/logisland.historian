package com.hurence.logisland.historian.rest.v1.model.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class RequiredHeaderMissingCsvException extends RuntimeException {
    public RequiredHeaderMissingCsvException(String exception) {
        super(exception);
    }
}
