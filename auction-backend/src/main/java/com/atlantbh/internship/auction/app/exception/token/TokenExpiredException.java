package com.atlantbh.internship.auction.app.exception.token;

import com.atlantbh.internship.auction.app.exception.ValidationException;

public class TokenExpiredException extends ValidationException {
    public TokenExpiredException(final String message) {
        super(message);
    }
}
