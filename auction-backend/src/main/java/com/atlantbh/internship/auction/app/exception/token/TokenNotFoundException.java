package com.atlantbh.internship.auction.app.exception.token;

import com.atlantbh.internship.auction.app.exception.ValidationException;

public class TokenNotFoundException extends ValidationException {
    public TokenNotFoundException(final String message) {
        super(message);
    }
}
