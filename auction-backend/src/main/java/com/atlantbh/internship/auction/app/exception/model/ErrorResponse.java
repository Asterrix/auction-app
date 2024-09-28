package com.atlantbh.internship.auction.app.exception.model;

import org.springframework.http.HttpStatus;

public record ErrorResponse(int code, String message, HttpStatus status) {
}
