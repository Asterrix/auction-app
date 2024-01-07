package com.atlantbh.internship.auction.app.service.featured.criteria;

import com.atlantbh.internship.auction.app.builder.SpecificationBuilder;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.service.featured.category.CategorySuggestion;
import com.atlantbh.internship.auction.app.service.featured.price.PriceSuggestion;
import com.atlantbh.internship.auction.app.specification.ItemSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public final class AuthenticatedUserCriteria {
    private final PriceSuggestion priceSuggestion;
    private final CategorySuggestion categorySuggestion;

    public AuthenticatedUserCriteria(final PriceSuggestion priceSuggestion,
                                     final CategorySuggestion categorySuggestion) {
        this.priceSuggestion = priceSuggestion;
        this.categorySuggestion = categorySuggestion;
    }

    public Specification<Item> userItems(final Integer userId) {
        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.ownerIs(userId))
                .build();
    }

    public Specification<Item> userBidItems(final Integer userId) {
        return SpecificationBuilder.of(Item.class)
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
                .and(ItemSpecification.orderByNumberOfBidsDesc());

        return specificationBuilder.build();
    }

    public Specification<Item> searchQueryCriteria(final Integer userId) {
        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.ownerIsNot(userId))
                .and(ItemSpecification.orderByNumberOfBidsDesc())
                .build();
    }
}
