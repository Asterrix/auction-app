package com.atlantbh.internship.auction.app.model.utils;

import java.util.List;

public class MainValidationClass<T> {
    private final List<Validator<T>> validators;

    public MainValidationClass(final List<Validator<T>> validators) {
        this.validators = validators;
    }

    public void validate(T object) {
        validators.forEach(validator -> validator.validate(object));
    }
}
