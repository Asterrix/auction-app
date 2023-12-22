package com.atlantbh.internship.auction.app.model.suggestion.strategy;

import com.atlantbh.internship.auction.app.model.suggestion.FeaturedSuggestion;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.service.item.ItemService;
import com.atlantbh.internship.auction.app.service.specification.ItemSpecification;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public final class RegularUserSuggestionStrategy {
    private final ItemService itemService;
    private final FeaturedSuggestion featuredSuggestion;
    private final int noQueryParamsItemCount = 64;

    public RegularUserSuggestionStrategy(final ItemService itemService, final FeaturedSuggestion featuredSuggestion) {
        this.itemService = itemService;
        this.featuredSuggestion = featuredSuggestion;
    }

    public List<Item> getSuggestions(final ZonedDateTime currentTime, final String query, final int count) {
        final Specification<Item> regularUserCriteria = featuredSuggestion.getRegularUserCriteria(currentTime);

        if (StringUtils.isBlank(query)) {
            return handleSuggestionsNoQueryParams(regularUserCriteria, count);
        }

        return handleSuggestionsWithQueryParams(regularUserCriteria, query, count);
    }

    private List<Item> handleSuggestionsNoQueryParams(final Specification<Item> specification, final int count) {
        final List<Item> suggestionResult = itemService
                .findAll(specification, Pageable.ofSize(noQueryParamsItemCount))
                .getContent();

        if (suggestionResult.isEmpty()) {
            return List.of();
        }

        final List<Item> userItems = new ArrayList<>(suggestionResult);
        Collections.shuffle(userItems);

        return userItems.subList(0, Math.min(count, suggestionResult.size()));
    }


    private List<Item> handleSuggestionsWithQueryParams(final Specification<Item> specification, final String query, final int count) {
        final List<Item> items = itemService.findAll(specification);
        final List<String> searchSuggestions = featuredSuggestion.getSearchSuggestions(items, query, count);

        return searchSuggestions.stream()
                .map(suggestion -> specification.and(ItemSpecification.hasName(suggestion)))
                .map(itemService::findAll)
                .filter(itemList -> !itemList.isEmpty())
                .flatMap(List::stream)
                .collect(Collectors.toList());
    }

}
