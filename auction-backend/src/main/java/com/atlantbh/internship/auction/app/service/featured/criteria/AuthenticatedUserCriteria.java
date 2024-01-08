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

/**
 * Class responsible for creating {@link Specification} that are meant to be used to create item suggestions for the authenticated user.
 * It contains all the criteria that are used to create item suggestions for the authenticated user.
 */
@Component
public final class AuthenticatedUserCriteria {
    private final PriceSuggestion priceSuggestion;
    private final CategorySuggestion categorySuggestion;

    public AuthenticatedUserCriteria(final PriceSuggestion priceSuggestion,
                                     final CategorySuggestion categorySuggestion) {
        this.priceSuggestion = priceSuggestion;
        this.categorySuggestion = categorySuggestion;
    }

    /**
     * @param userId The id of the authenticated user
     * @return A {@link Specification} that specifies that the sql query should return items that the authenticated user has listed.
     */
    public Specification<Item> userItems(final Integer userId) {
        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.ownerIs(userId))
                .build();
    }

    /**
     * @param userId The id of the authenticated user
     * @return A {@link Specification} that specifies that the sql query should return items that the authenticated user has bid on.
     */
    public Specification<Item> userBidItems(final Integer userId) {
        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.hasBidder(userId))
                .build();
    }

    /**
     * Creates a {@link Specification} that is meant to be used to create item suggestions for the authenticated user.
     * The specification is created based on the authenticated user's most popular category and a price range.
     * The Price range is calculated based on the average price of items that the authenticated user has listed
     * and made bids on.
     * The specification is also ordered by the number of bids in descending order.
     *
     * @param userId           The id of the authenticated user
     * @param userRelatedItems A {@link List} of {@link Item} that are related to the authenticated user
     * @return A {@link Specification} to be used to create item suggestions for the authenticated user
     */
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

    /**
     * @param userId The id of the authenticated user
     * @return A {@link Specification} that is meant to be used as a search query criteria for the authenticated user.
     */
    public Specification<Item> searchQueryCriteria(final Integer userId) {
        return SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.ownerIsNot(userId))
                .and(ItemSpecification.orderByNumberOfBidsDesc())
                .build();
    }
}
