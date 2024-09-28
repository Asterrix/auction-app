package com.atlantbh.internship.auction.app.model.utils;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class SpecificationBuilder<T> {
    private final List<Specification<T>> specifications = new ArrayList<>();

    public SpecificationBuilder<T> with(final Specification<T> specification) {
        specifications.add(specification);
        return this;
    }

    public SpecificationBuilder<T> and(final Specification<T> specification) {
        return with(Specification.allOf(specification).and(specification));
    }

    public SpecificationBuilder<T> or(final Specification<T> specification) {
        return with(Specification.allOf(specification).or(specification));
    }

    public Specification<T> build() {
        return (root, query, criteriaBuilder) -> {
            final Predicate[] predicates = specifications.stream()
                    .map(specification -> specification.toPredicate(root, query, criteriaBuilder))
                    .toArray(Predicate[]::new);

            return criteriaBuilder.and(predicates);
        };
    }
}