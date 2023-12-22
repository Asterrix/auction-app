package com.atlantbh.internship.auction.app.builder;

import org.springframework.data.jpa.domain.Specification;

public final class SpecificationBuilder<T> {
    private Specification<T> specification = (root, query, criteriaBuilder) -> criteriaBuilder.conjunction();

    private SpecificationBuilder() {
    }

    public static <T> SpecificationBuilder<T> of(final Class<T> tClass) {
        return new SpecificationBuilder<>();
    }

    public SpecificationBuilder<T> and(final Specification<T> specification) {
        this.specification = this.specification.and(specification);
        return this;
    }

    public SpecificationBuilder<T> or(final Specification<T> specification) {
        this.specification = this.specification.or(specification);
        return this;
    }

    public Specification<T> build() {
        return specification;
    }
}
