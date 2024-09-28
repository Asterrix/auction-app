package com.atlantbh.internship.auction.app.service.featured.criteria;

import com.atlantbh.internship.auction.app.builder.SpecificationBuilder;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.service.featured.category.CategorySuggestion;
import com.atlantbh.internship.auction.app.service.featured.price.PriceSuggestion;
import com.atlantbh.internship.auction.app.specification.ItemSpecification;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

public final class AuthenticatedUserCriteria {
    private final ZonedDateTime userHistoryTimeLimit;
    private final ZonedDateTime endTimeStartLimit;
    private final ZonedDateTime endTimeEndLimit;
    private final PriceSuggestion priceSuggestion;
    private final CategorySuggestion categorySuggestion;

    public AuthenticatedUserCriteria(final ZonedDateTime userRelatedItemsTimeSpan,
                                     final ZonedDateTime endTimeStartLimit,
                                     final ZonedDateTime endTimeEndLimit,
                                     final PriceSuggestion priceSuggestion,
                                     final CategorySuggestion categorySuggestion) {
        this.userHistoryTimeLimit = userRelatedItemsTimeSpan;
        this.endTimeStartLimit = endTimeStartLimit;
        this.endTimeEndLimit = endTimeEndLimit;
        this.priceSuggestion = priceSuggestion;
        this.categorySuggestion = categorySuggestion;
    }

    public Specification<Item> userItems(final Integer userId) {
        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.endTimeIsNotOlderThan(userHistoryTimeLimit))
                .and(ItemSpecification.ownerIs(userId))
                .build();
    }

    public Specification<Item> userBidItems(final Integer userId) {
        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.endTimeIsNotOlderThan(userHistoryTimeLimit))
                .and(ItemSpecification.hasBidder(userId))
                .build();
    }

    public Specification<Item> criteria(final Integer userId, final List<Item> userRelatedItems) {
        final Category mostPopularCategory = categorySuggestion.findMostPopularCategory(userRelatedItems);
        final BigDecimal averagePrice = priceSuggestion.calculateAveragePrice(userRelatedItems);
        final BigDecimal startingPrice = priceSuggestion.calculateStartingPriceEndpoint(averagePrice);
        final BigDecimal endingPrice = priceSuggestion.calculateEndingPriceEndpoint(averagePrice);

        final String mostPopularCategoryParentName = mostPopularCategory.getParentCategory().getName();
        final String mostPopularSubcategoryName = mostPopularCategory.getName();

        final SpecificationBuilder<Item> specificationBuilder = SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.ownerIsNot(userId))
                .and(ItemSpecification.hasCategory(mostPopularCategoryParentName, mostPopularSubcategoryName))
                .and(ItemSpecification.priceIsBetween(startingPrice, endingPrice))
                .and(ItemSpecification.endTimeIsNotShorterThan(endTimeStartLimit))
                .and(ItemSpecification.endTimeIsNotOlderThan(endTimeEndLimit))
                .and(ItemSpecification.orderByNumberOfBidsDesc());

        return specificationBuilder.build();
    }

    public Specification<Item> searchQueryCriteria(final Integer userId) {
        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.ownerIsNot(userId))
                .and(ItemSpecification.endTimeIsNotShorterThan(endTimeStartLimit))
                .and(ItemSpecification.endTimeIsNotOlderThan(endTimeEndLimit))
                .and(ItemSpecification.orderByNumberOfBidsDesc())
                .build();
    }
}
