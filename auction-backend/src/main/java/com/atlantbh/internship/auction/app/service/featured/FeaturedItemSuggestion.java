package com.atlantbh.internship.auction.app.service.featured;

import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.service.featured.strategy.AuthenticatedSuggestionStrategy;
import com.atlantbh.internship.auction.app.service.featured.strategy.AuthenticatedUserSuggestionStrategy;
import com.atlantbh.internship.auction.app.service.featured.strategy.RegularSuggestionStrategy;
import com.atlantbh.internship.auction.app.service.featured.strategy.RegularUserSuggestionStrategy;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public final class FeaturedItemSuggestion implements RegularSuggestionStrategy, AuthenticatedSuggestionStrategy {
    private final AuthenticatedUserSuggestionStrategy authenticatedUserStrategy;
    private final RegularUserSuggestionStrategy regularUserStrategy;

    public FeaturedItemSuggestion(final AuthenticatedUserSuggestionStrategy authenticatedUserStrategy,
                                  final RegularUserSuggestionStrategy regularUserStrategy) {
        this.regularUserStrategy = regularUserStrategy;
        this.authenticatedUserStrategy = authenticatedUserStrategy;
    }

    @Override
    public List<Item> suggestions(final Integer userId, final String searchQuery, final int itemCount) {
        return authenticatedUserStrategy.suggestions(userId, searchQuery, itemCount);
    }

    @Override
    public List<Item> suggestions(final String searchQuery, final int itemCount) {
        return regularUserStrategy.suggestions(searchQuery, itemCount);
    }
}
