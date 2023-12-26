package com.atlantbh.internship.auction.app.service.featured.criteria;

import com.atlantbh.internship.auction.app.builder.SpecificationBuilder;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.specification.ItemSpecification;
import org.springframework.data.jpa.domain.Specification;

import java.time.ZonedDateTime;

public final class RegularUserCriteria {
    private final ZonedDateTime endTimeLimit;

    public RegularUserCriteria(final ZonedDateTime endTimeLimit) {
        this.endTimeLimit = endTimeLimit;
    }

    public Specification<Item> criteria() {
        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.endTimeIsNotOlderThan(endTimeLimit))
                .and(ItemSpecification.orderByNumberOfBidsDesc())
                .build();
    }
}
