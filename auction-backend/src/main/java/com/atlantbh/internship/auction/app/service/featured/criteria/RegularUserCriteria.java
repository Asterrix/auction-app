package com.atlantbh.internship.auction.app.service.featured.criteria;

import com.atlantbh.internship.auction.app.builder.SpecificationBuilder;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.specification.ItemSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

/**
 * Class responsible for creating {@link Specification} that are meant to be used to create item suggestions for the regular user.
 */
@Component
public final class RegularUserCriteria {
    /**
     * @return A {@link Specification} that specifies that the sql query should return items that are currently active,
     * ordered by the number of bids in descending order.
     */
    public Specification<Item> criteria() {
        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.orderByNumberOfBidsDesc())
                .build();
    }
}
