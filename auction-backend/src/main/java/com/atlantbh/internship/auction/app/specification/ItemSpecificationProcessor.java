package com.atlantbh.internship.auction.app.specification;

import com.atlantbh.internship.auction.app.builder.SpecificationBuilder;
import com.atlantbh.internship.auction.app.dto.item.requests.CategoryRequest;
import com.atlantbh.internship.auction.app.dto.item.requests.GetItemsRequest;
import com.atlantbh.internship.auction.app.entity.Item;
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

    public void processCategory(final GetItemsRequest request) {
        Specification<Item> categorySpec = null;

        if (request.categories() != null && !request.categories().isEmpty()) {
            for (final CategoryRequest category : request.categories()) {
                if (StringUtils.isNotBlank(category.category())) {
                    for (final String subcategory : category.subcategories()) {
                        final Specification<Item> currentSpec = ItemSpecification.hasSubcategory(category.category(), subcategory);
                        categorySpec = (categorySpec == null) ? currentSpec : categorySpec.or(currentSpec);
                    }
                }
            }
        }

        if (categorySpec != null) {
            specification.and(categorySpec);
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
