package com.atlantbh.internship.auction.app.service.featured.criteria;

import com.atlantbh.internship.auction.app.builder.SpecificationBuilder;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.specification.ItemSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public final class RegularUserCriteria {
    public Specification<Item> criteria() {
        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.orderByNumberOfBidsDesc())
                .build();
    }
}
