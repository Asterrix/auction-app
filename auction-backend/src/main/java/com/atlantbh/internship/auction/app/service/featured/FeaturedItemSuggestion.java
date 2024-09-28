package com.atlantbh.internship.auction.app.service.featured;

import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.service.featured.strategy.AuthenticatedSuggestionStrategy;
import com.atlantbh.internship.auction.app.service.featured.strategy.AuthenticatedUserSuggestionStrategy;
import com.atlantbh.internship.auction.app.service.featured.strategy.RegularSuggestionStrategy;
import com.atlantbh.internship.auction.app.service.featured.strategy.RegularUserSuggestionStrategy;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public final class FeaturedItemSuggestion implements RegularSuggestionStrategy, AuthenticatedSuggestionStrategy {
    private final AuthenticatedUserSuggestionStrategy authenticatedUserStrategy;
    private final RegularUserSuggestionStrategy regularUserStrategy;

    public FeaturedItemSuggestion(final AuthenticatedUserSuggestionStrategy authenticatedUserStrategy,
                                  final RegularUserSuggestionStrategy regularUserStrategy) {
        this.regularUserStrategy = regularUserStrategy;
        this.authenticatedUserStrategy = authenticatedUserStrategy;
    }

    /**
     * Check {@link AuthenticatedUserSuggestionStrategy#suggestions(Integer, String, int)} for more details.
     * @param userId      User id of the authenticated user
     * @param searchQuery Search query
     * @param itemCount   Number of suggestion items to return
     * @return {@link Optional} of {@link List} of {@link Item}
     */
    @Override
    public Optional<List<Item>> suggestions(final Integer userId, final String searchQuery, final int itemCount) {
        return authenticatedUserStrategy.suggestions(userId, searchQuery, itemCount);
    }

    /**
     * Check {@link RegularUserSuggestionStrategy#suggestions(String, int)} for more details.
     * @param searchQuery Search query
     * @param itemCount  Number of suggestion items to return
     * @return {@link Optional} of {@link List} of {@link Item}
     */
    @Override
    public Optional<List<Item>> suggestions(final String searchQuery, final int itemCount) {
        return regularUserStrategy.suggestions(searchQuery, itemCount);
    }
}
