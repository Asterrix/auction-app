package com.atlantbh.internship.auction.app.exception;

import com.atlantbh.internship.auction.app.exception.model.ErrorResponse;
import com.atlantbh.internship.auction.app.exception.model.ErrorResponseDetails;
import org.springframework.http.HttpStatus;

public class ValidationException extends RuntimeException {
    private final static String TYPE = "https://www.rfc-editor.org/rfc/rfc9110.html#name-400-bad-request";
    private final static String REASON = "Validation Error";
    private final ErrorResponse errorResponse;

    public ValidationException(final String message) {
        super(message);
        final ErrorResponseDetails errorResponseDetails = new ErrorResponseDetails(TYPE, REASON);
        errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), message, HttpStatus.BAD_REQUEST, errorResponseDetails);
    }

    public ErrorResponse getErrorResponse() {
        return errorResponse;
    }
}
