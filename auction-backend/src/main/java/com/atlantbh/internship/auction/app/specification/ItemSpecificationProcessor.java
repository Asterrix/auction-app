package com.atlantbh.internship.auction.app.specification;

import com.atlantbh.internship.auction.app.dto.item.requests.GetItemsRequest;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.builder.SpecificationBuilder;
import com.atlantbh.internship.auction.app.model.utils.SpecificationProcessor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public final class ItemSpecificationProcessor implements SpecificationProcessor<Item, GetItemsRequest> {
    private final SpecificationBuilder<Item> specification = SpecificationBuilder.of(Item.class)
            .and(ItemSpecification.notFinished())
            .and(ItemSpecification.orderByNameAsc())
            .and(ItemSpecification.isActive());

    @Override
    public Specification<Item> process(final GetItemsRequest request) {
        processName(request);
        processCategory(request);
        processOrderBy(request);

        return specification.build();
    }

    private void processName(final GetItemsRequest request) {
        if (StringUtils.isNotBlank(request.name())) {
            specification.and(ItemSpecification.hasName(request.name()));
        }
    }

    private void processCategory(final GetItemsRequest request) {
        if (StringUtils.isNotBlank(request.subcategory()) && StringUtils.isNotBlank(request.category())) {
            specification.and(ItemSpecification.hasSubcategory(request.category(), request.subcategory()));
        } else if (StringUtils.isNotBlank(request.category())) {
            specification.and(ItemSpecification.hasCategory(request.category()));
        }
    }

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
