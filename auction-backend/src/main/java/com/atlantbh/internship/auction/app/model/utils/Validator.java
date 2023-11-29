package com.atlantbh.internship.auction.app.model.utils;

public interface Validator<T> {
    void validate(T object);
}