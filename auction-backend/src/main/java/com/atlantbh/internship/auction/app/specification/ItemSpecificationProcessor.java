package com.atlantbh.internship.auction.app.specification;

import com.atlantbh.internship.auction.app.builder.SpecificationBuilder;
import com.atlantbh.internship.auction.app.dto.item.requests.CategoryRequest;
import com.atlantbh.internship.auction.app.dto.item.requests.GetItemsRequest;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.model.utils.SpecificationProcessor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

/**
 * Specification processor for {@link Item} entity.
 * Handles filtering and sorting of items based on {@link GetItemsRequest}.
 */
public final class ItemSpecificationProcessor implements SpecificationProcessor<Item, GetItemsRequest> {
    private final SpecificationBuilder<Item> specification = SpecificationBuilder.of(Item.class)
            .and(ItemSpecification.notFinished())
            .and(ItemSpecification.orderByNameAsc())
            .and(ItemSpecification.isActive());

    /**
     * Processes all filtering and sorting parameters for {@link Item}.
     * Creates a single {@link Specification} for {@link Item} entity.
     * @param request {@link GetItemsRequest} containing filtering and sorting parameters
     * @return {@link Specification} for {@link Item} entity
     */
    @Override
    public Specification<Item> process(final GetItemsRequest request) {
        processName(request);
        processCategory(request);
        processPrice(request);
        processOrderBy(request);

        return specification.build();
    }

    /**
     * Processes name filtering for {@link Item}.
     * @param request {@link GetItemsRequest} containing filtering and sorting parameters
     */
    private void processName(final GetItemsRequest request) {
        if (StringUtils.isNotBlank(request.name())) {
            specification.and(ItemSpecification.hasName(request.name()));
        }
    }

    /**
     * Processes category filtering for {@link Item}.
     * @param request {@link GetItemsRequest} containing filtering and sorting parameters
     */
    public void processCategory(final GetItemsRequest request) {
        Specification<Item> categorySpec = null;

        if (request.categories() != null && !request.categories().isEmpty()) {
            for (final CategoryRequest category : request.categories()) {
                if (StringUtils.isNotBlank(category.category())) {
                    for (final String subcategory : category.subcategories()) {
                        final Specification<Item> currentSpec = ItemSpecification.hasCategory(category.category(), subcategory);
                        categorySpec = (categorySpec == null) ? currentSpec : categorySpec.or(currentSpec);
                    }
                }
            }
        }

        if (categorySpec != null) {
            specification.and(categorySpec);
        }
    }

    private void processPrice(final GetItemsRequest request) {
        if (request.priceFilter() != null && request.priceFilter().minPrice() != null && request.priceFilter().maxPrice() != null) {
            if (request.priceFilter().minPrice() > request.priceFilter().maxPrice()) {
                throw new IllegalArgumentException("Min priceFilter cannot be greater than max priceFilter.");
            }

            if (request.priceFilter().minPrice() >= 0) {
                final BigDecimal minPrice = BigDecimal.valueOf(request.priceFilter().minPrice());
                final BigDecimal maxPrice = BigDecimal.valueOf(request.priceFilter().maxPrice());

                specification.and(ItemSpecification.priceIsBetweenIncludingBids(minPrice, maxPrice));
            }
        }
    }

    /**
     * Processes sorting for {@link Item}.
     * @param request {@link GetItemsRequest} containing filtering and sorting parameters
     */
    private void processOrderBy(final GetItemsRequest request) {
        if (StringUtils.isNotBlank(request.orderBy())) {
            switch (request.orderBy()) {
                case "newest" -> specification.and(ItemSpecification.orderByNewest());
                case "timeLeft" -> specification.and(ItemSpecification.orderByTimeLeft());
                case "priceAsc" -> specification.and(ItemSpecification.orderByPriceAsc());
                case "priceDesc" -> specification.and(ItemSpecification.orderByPriceDesc());
                default -> specification.and(ItemSpecification.orderByNameAsc());
            }
        }
    }

    public Specification<Item> hasHighestInitialPrice(){
        final SpecificationBuilder<Item> specification = SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.hasHighestInitialPrice());

        return specification.build();
    }

    public Specification<Item> hasHighestBid(){
        final SpecificationBuilder<Item> specification = SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.hasHighestBidAmount());

        return specification.build();
    }

    public Specification<Item> hasLowestInitialPrice(){
        final SpecificationBuilder<Item> specification = SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.hasLowestInitialPrice());

        return specification.build();
    }

    public Specification<Item> hasLowestBid(){
        final SpecificationBuilder<Item> specification = SpecificationBuilder.of(Item.class)
                .and(ItemSpecification.isActive())
                .and(ItemSpecification.hasLowestBidAmount());

        return specification.build();
    }
}
