package com.atlantbh.internship.auction.app.exception;

import com.atlantbh.internship.auction.app.exception.dto.ErrorResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponseDto> handleValidationException(ValidationException e) {
        final ErrorResponseDto errorResponseDto = new ErrorResponseDto(e.getErrorResponse());
        return new ResponseEntity<>(errorResponseDto, e.getErrorResponse().status());
    }
}
