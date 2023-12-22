package com.atlantbh.internship.auction.app.builder;

import org.springframework.data.jpa.domain.Specification;

/**
 * Specification builder class used to build specifications for JPA queries.
 * @param <T> Entity class, used to build specifications for.
 */
public final class SpecificationBuilder<T> {
    private Specification<T> specification = (root, query, criteriaBuilder) -> criteriaBuilder.conjunction();

    private SpecificationBuilder() {
    }

    /**
     * @param tClass Entity class, used to build specifications for.
     * @return Specification builder instance.
     */
    public static <T> SpecificationBuilder<T> of(final Class<T> tClass) {
        return new SpecificationBuilder<>();
    }

    /**
     * @param specification Specification to be added to the builder. Grouped with AND operator, meaning that all specifications must be satisfied.
     * @return Specification builder instance.
     */
    public SpecificationBuilder<T> and(final Specification<T> specification) {
        this.specification = this.specification.and(specification);
        return this;
    }

    /**
     * @param specification Specification to be added to the builder. Grouped with OR operator, meaning that at least one specification must be satisfied.
     * @return Specification builder instance.
     */
    public SpecificationBuilder<T> or(final Specification<T> specification) {
        this.specification = this.specification.or(specification);
        return this;
    }

    /**
     * @return Specification built from all specifications added to the builder.
     */
    public Specification<T> build() {
        return specification;
    }
}
