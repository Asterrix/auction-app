package com.atlantbh.internship.auction.app.service.featured.criteria;

import com.atlantbh.internship.auction.app.builder.SpecificationBuilder;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.service.specification.ItemSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public final class SearchCriteria {

    public Specification<Item> criteria(final int itemCount, final List<String> searchSuggestions) {
        final SpecificationBuilder<Item> specificationBuilder = SpecificationBuilder.of(Item.class);
        final int size = Math.min(itemCount, searchSuggestions.size());

        int i = 0;
        while (i < size) {
            final String itemNameSuggestion = searchSuggestions.get(i);
            specificationBuilder.or(ItemSpecification.hasName(itemNameSuggestion));
            i++;
        }

        return specificationBuilder.build();
    }

}
