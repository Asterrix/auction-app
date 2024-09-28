package com.atlantbh.internship.auction.app.model.suggestion;

import com.atlantbh.internship.auction.app.model.suggestion.search.SearchQuerySuggestion;
import com.atlantbh.internship.auction.app.model.suggestion.category.CategorySuggestion;
import com.atlantbh.internship.auction.app.model.suggestion.price.PriceSuggestion;
import com.atlantbh.internship.auction.app.builder.SpecificationBuilder;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.service.specification.ItemSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

@Component
public final class FeaturedItemSuggestion implements FeaturedSuggestion {
    private final PriceSuggestion priceSuggestion;
    private final SearchQuerySuggestion searchSuggestion;
    private final CategorySuggestion categorySuggestion;

    @Autowired
    public FeaturedItemSuggestion(final PriceSuggestion priceSuggestion,
                                  final SearchQuerySuggestion searchSuggestion,
                                  final CategorySuggestion categorySuggestion) {
        this.priceSuggestion = priceSuggestion;
        this.searchSuggestion = searchSuggestion;
        this.categorySuggestion = categorySuggestion;
    }

    @Override
    public Specification<Item> getUserItemsCriteria(final Integer userId, final ZonedDateTime currentTime) {
        final ZonedDateTime endTimeMonths = currentTime.plusMonths(6);

        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.endTimeIsNotOlderThan(endTimeMonths))
                .and(ItemSpecification.ownerIs(userId))
                .build();
    }

    @Override
    public Specification<Item> getUserBidsCriteria(final Integer userId, final ZonedDateTime currentTime) {
        final ZonedDateTime endTimeMonths = currentTime.plusMonths(6);

        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.endTimeIsNotOlderThan(endTimeMonths))
                .and(ItemSpecification.hasBidder(userId))
                .build();
    }

    @Override
    public Specification<Item> getAuthenticatedQueryCriteria(final Integer userId, final ZonedDateTime currentTime) {
        final ZonedDateTime searchQueryTimeSpan = currentTime.plusMonths(1);

        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.notFinished())
                .and(ItemSpecification.ownerIsNot(userId))
                .and(ItemSpecification.endTimeIsNotOlderThan(searchQueryTimeSpan))
                .and(ItemSpecification.hasHighestNumberOfBids())
                .build();
    }

    @Override
    public Specification<Item> getRegularUserCriteria(final ZonedDateTime currentTime) {
        final ZonedDateTime regularUserTimeSpan = currentTime.plusWeeks(2);

        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.notFinished())
                .and(ItemSpecification.endTimeIsNotOlderThan(regularUserTimeSpan))
                .and(ItemSpecification.hasHighestNumberOfBids())
                .build();
    }

    @Override
    public Specification<Item> getAuthenticatedUserCriteria(final Integer userId, final List<Item> userRelatedItems, final ZonedDateTime currentTime) {
        final Category mostPopularCategory = categorySuggestion.findMostPopularCategory(userRelatedItems);
        final BigDecimal averagePrice = priceSuggestion.calculateAveragePrice(userRelatedItems);
        final BigDecimal startingPrice = priceSuggestion.calculateStartingPriceEndpoint(averagePrice);
        final BigDecimal endingPrice = priceSuggestion.calculateEndingPriceEndpoint(averagePrice);

        final ZonedDateTime endTimeHours = currentTime.plusHours(1);
        final ZonedDateTime endTimeMonths = currentTime.plusMonths(1);

        final String mostPopularCategoryParentName = mostPopularCategory.getParentCategory().getName();
        final String mostPopularSubcategoryName = mostPopularCategory.getName();

        final SpecificationBuilder<Item> specificationBuilder = SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.notFinished())
                .and(ItemSpecification.ownerIsNot(userId))
                .and(ItemSpecification.hasSubcategory(mostPopularCategoryParentName, mostPopularSubcategoryName))
                .and(ItemSpecification.priceIsBetween(startingPrice, endingPrice))
                .and(ItemSpecification.endTimeIsNotShorterThan(endTimeHours))
                .and(ItemSpecification.endTimeIsNotOlderThan(endTimeMonths))
                .and(ItemSpecification.hasHighestNumberOfBids());

        return specificationBuilder.build();
    }

    @Override
    public List<String> getSearchSuggestions(final List<Item> items, final String query, final Integer count) {
        final List<String> itemNames = items
                .stream()
                .map(Item::getName)
                .toList();
        final List<String> searchSuggestions = searchSuggestion.getSearchSuggestion(itemNames, query);

        return searchSuggestions.stream().limit(count).toList();
    }
}
