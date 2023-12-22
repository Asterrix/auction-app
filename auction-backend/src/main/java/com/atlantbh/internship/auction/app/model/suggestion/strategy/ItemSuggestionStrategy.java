package com.atlantbh.internship.auction.app.model.suggestion.strategy;

import com.atlantbh.internship.auction.app.entity.Item;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.List;

@Component
public class ItemSuggestionStrategy {
    private final AuthenticatedUserSuggestionStrategy authenticatedUserSuggestionStrategy;
    private final RegularUserSuggestionStrategy regularUserSuggestionStrategy;

    public ItemSuggestionStrategy(final AuthenticatedUserSuggestionStrategy authenticatedUserSuggestionStrategy,
                                  final RegularUserSuggestionStrategy regularUserSuggestionStrategy) {
        this.authenticatedUserSuggestionStrategy = authenticatedUserSuggestionStrategy;
        this.regularUserSuggestionStrategy = regularUserSuggestionStrategy;
    }

    public List<Item> getSuggestionsAuthenticatedUser(final Integer userId, final String query, final int count, final ZonedDateTime currentTime) {
        return authenticatedUserSuggestionStrategy.getSuggestions(userId, query, count, currentTime);
    }

    public List<Item> getSuggestionsRegularUser(final int count, final String query, final ZonedDateTime currentTime) {
        return regularUserSuggestionStrategy.getSuggestions(currentTime, query, count);
    }
}
