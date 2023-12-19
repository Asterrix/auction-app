package com.atlantbh.internship.auction.app.model.utils;

import org.springframework.data.jpa.domain.Specification;

public interface SpecificationProcessor<T, U> {
    Specification<T> process(final U request);
}
