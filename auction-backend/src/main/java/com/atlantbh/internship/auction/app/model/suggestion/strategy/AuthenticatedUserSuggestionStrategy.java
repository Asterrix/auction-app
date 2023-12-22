package com.atlantbh.internship.auction.app.model.suggestion.strategy;

import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.model.suggestion.FeaturedSuggestion;
import com.atlantbh.internship.auction.app.service.item.ItemService;
import com.atlantbh.internship.auction.app.service.specification.ItemSpecification;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public final class AuthenticatedUserSuggestionStrategy {
    private final ItemService itemService;
    private final FeaturedSuggestion featuredSuggestion;

    public AuthenticatedUserSuggestionStrategy(final ItemService itemService, final FeaturedSuggestion featuredSuggestion) {
        this.itemService = itemService;
        this.featuredSuggestion = featuredSuggestion;
    }

    public List<Item> getSuggestions(final Integer userId, final String query, final int count, final ZonedDateTime currentTime) {
        if (StringUtils.isBlank(query)) {
            return handleSuggestionsNoQueryParams(userId, count, currentTime);
        }

        return handleSuggestionsWithQueryParams(userId, query, count, currentTime);
    }

    private List<Item> handleSuggestionsNoQueryParams(final Integer userId, final int count, final ZonedDateTime currentTime) {
        final List<Item> userItemInformation = getUserRelatedItems(userId, currentTime);
        final Specification<Item> userPreference = featuredSuggestion.getAuthenticatedUserCriteria(userId, userItemInformation, currentTime);
        final Page<Item> items = itemService.findAll(userPreference, Pageable.ofSize(count));

        return items.getContent();
    }

    private List<Item> getUserRelatedItems(final Integer userId, final ZonedDateTime currentTime) {
        final Specification<Item> userItemsSpecification = featuredSuggestion.getUserItemsCriteria(userId, currentTime);
        final Specification<Item> userBidsSpecification = featuredSuggestion.getUserBidsCriteria(userId, currentTime);

        final List<Item> userItems = itemService.findAll(userItemsSpecification);
        final List<Item> userBidItems = itemService.findAll(userBidsSpecification);

        userItems.addAll(userBidItems);

        return userItems;
    }

    private List<Item> handleSuggestionsWithQueryParams(Integer userId, String query, int count, ZonedDateTime currentTime) {
        final Specification<Item> authenticatedQuerySpecification = featuredSuggestion.getAuthenticatedQueryCriteria(userId, currentTime);
        final List<Item> items = itemService.findAll(authenticatedQuerySpecification);
        final List<String> searchSuggestions = featuredSuggestion.getSearchSuggestions(items, query, count);

        return searchSuggestions.stream()
                .map(suggestion -> authenticatedQuerySpecification.and(ItemSpecification.hasName(suggestion)))
                .flatMap(searchSpecification -> {
                    final int itemCount = 1;

                    return itemService.findAll(searchSpecification, Pageable.ofSize(itemCount))
                            .getContent()
                            .stream();
                })
                .collect(Collectors.toList());
    }
}
