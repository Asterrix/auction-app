package com.atlantbh.internship.auction.app.exception.dto;

import com.atlantbh.internship.auction.app.exception.model.ErrorResponse;

import java.io.Serializable;

public record ErrorResponseDto(ErrorResponse error) implements Serializable {
}
