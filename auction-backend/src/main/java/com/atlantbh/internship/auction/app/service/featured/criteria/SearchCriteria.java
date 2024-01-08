package com.atlantbh.internship.auction.app.service.featured.criteria;

import com.atlantbh.internship.auction.app.builder.SpecificationBuilder;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.service.featured.search.SearchSuggestion;
import com.atlantbh.internship.auction.app.specification.ItemSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Class responsible for creating a {@link Specification} for the {@link Item} entity.
 * Used for creating specification that will search for items that have the name found in the search suggestion list.
 * @see SearchSuggestion
 */
@Component
public final class SearchCriteria {

    /**
     * @param itemCount Number of items to take from the search suggestion list
     * @param searchSuggestions List containing search suggestions
     *                          that most closely match the input string
     *                          passed to the {@link SearchSuggestion#createSearchSuggestion(List, String)} method
     * @return A {@link Specification} that will search for items that have the similar name to the item names found in the search suggestion list.
     */
    public Specification<Item> criteria(final int itemCount, final List<String> searchSuggestions) {
        final SpecificationBuilder<Item> specificationBuilder = SpecificationBuilder.of(Item.class);
        final int size = Math.min(itemCount, searchSuggestions.size());

        for (int i = 0; i < size; i++) {
            final String itemNameSuggestion = searchSuggestions.get(i);
            specificationBuilder.or(ItemSpecification.hasName(itemNameSuggestion));
        }

        return specificationBuilder.build();
    }

}
