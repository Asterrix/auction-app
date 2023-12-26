package com.atlantbh.internship.auction.app.service.featured.strategy;

import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.service.featured.criteria.AuthenticatedUserCriteria;
import com.atlantbh.internship.auction.app.service.featured.criteria.SearchCriteria;
import com.atlantbh.internship.auction.app.service.featured.search.SearchSuggestion;
import com.atlantbh.internship.auction.app.service.item.ItemService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

@Component
public final class AuthenticatedUserSuggestionStrategy implements AuthenticatedSuggestionStrategy {
    private final AuthenticatedUserCriteria authenticatedUserCriteria;
    private final ItemService itemService;
    private final SearchCriteria searchCriteria;
    private final SearchSuggestion searchSuggestion;

    public AuthenticatedUserSuggestionStrategy(final AuthenticatedUserCriteria authenticatedUserCriteria,
                                               final ItemService itemService,
                                               final SearchCriteria searchCriteria,
                                               final SearchSuggestion searchSuggestion) {
        this.authenticatedUserCriteria = authenticatedUserCriteria;
        this.itemService = itemService;
        this.searchCriteria = searchCriteria;
        this.searchSuggestion = searchSuggestion;
    }

    @Override
    public List<Item> suggestions(final Integer userId, final String searchQuery, final int itemCount) {
        if (StringUtils.isBlank(searchQuery)) {
            return createSuggestion(userId, itemCount);
        }

        return createSuggestionQueryParams(userId, searchQuery, itemCount);
    }

    private List<Item> createSuggestion(final Integer userId, final int itemCount) {
        final List<Item> userRelatedItems = userRelatedItems(userId);
        final Specification<Item> userPreference = authenticatedUserCriteria.criteria(userId, userRelatedItems);
        final List<Item> suggestions = itemService.findAll(userPreference, Pageable.ofSize(itemCount)).getContent();

        return suggestions;
    }

    private List<Item> createSuggestionQueryParams(final Integer userId, final String searchQuery, final int itemCount) {
        final Specification<Item> searchQueryCriteria = authenticatedUserCriteria.searchQueryCriteria(userId);
        final List<Item> items = itemService.findAll(searchQueryCriteria);
        final List<String> itemNames = items.stream().map(Item::getName).toList();
        final List<String> searchSuggestions = searchSuggestion.searchSuggestion(itemNames, searchQuery);

        final Specification<Item> nameSpecification = searchCriteria.criteria(itemCount, searchSuggestions);
        final Specification<Item> searchSuggestionsSpecification = searchQueryCriteria.and(nameSpecification);

        final List<Item> suggestions = itemService.findAll(searchSuggestionsSpecification, Pageable.ofSize(itemCount)).getContent();
        final List<Item> sortedSuggestions = suggestions.stream().sorted((o1, o2) -> {
            final int index1 = searchSuggestions.indexOf(o1.getName());
            final int index2 = searchSuggestions.indexOf(o2.getName());

            return Integer.compare(index1, index2);
        }).toList();

        return sortedSuggestions;
    }

    private List<Item> userRelatedItems(final Integer userId) {
        final Specification<Item> userItemsSpecification = authenticatedUserCriteria.userItems(userId);
        final Specification<Item> userBidsSpecification = authenticatedUserCriteria.userBidItems(userId);

        final CompletableFuture<List<Item>> userItemsFuture = CompletableFuture
                .supplyAsync(() -> itemService.findAll(userItemsSpecification))
                .exceptionally(e -> {
                    throw new CompletionException("Operation of fetching user related items failed to complete.", e);
                });

        final CompletableFuture<List<Item>> userBidsFuture = CompletableFuture
                .supplyAsync(() -> itemService.findAll(userBidsSpecification))
                .exceptionally(e -> {
                    throw new CompletionException("Operation of fetching user related bid items failed to complete.", e);
                });

        final List<Item> userRelatedItems = userItemsFuture.thenCombine(userBidsFuture, (userItems, userBids) -> {
            userItems.addAll(userBids);
            return userItems;
        }).join();


        return userRelatedItems;
    }
}
