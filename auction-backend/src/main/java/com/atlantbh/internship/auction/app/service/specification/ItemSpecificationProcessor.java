package com.atlantbh.internship.auction.app.service.specification;

import com.atlantbh.internship.auction.app.dto.item.requests.GetItemsRequest;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.model.utils.SpecificationBuilder;
import com.atlantbh.internship.auction.app.model.utils.SpecificationProcessor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

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
    private void processCategory(final GetItemsRequest request) {
        if (StringUtils.isNotBlank(request.subcategory()) && StringUtils.isNotBlank(request.category())) {
            specification.and(ItemSpecification.hasCategory(request.category(), request.subcategory()));
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
}
