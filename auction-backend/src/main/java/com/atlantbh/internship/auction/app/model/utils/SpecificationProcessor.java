package com.atlantbh.internship.auction.app.model.utils;

import org.springframework.data.jpa.domain.Specification;

/**
 * @param <T> Entity type object
 * @param <U> Request type object,
 *           object that is sent from the client which contains all the filtration parameters
 *           used to create the specification
 */
public interface SpecificationProcessor<T, U> {
    Specification<T> process(final U request);
}
