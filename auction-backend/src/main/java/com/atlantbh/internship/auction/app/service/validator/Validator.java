package com.atlantbh.internship.auction.app.service.validator;

public interface Validator<T> {
    void validate(T object);
}
