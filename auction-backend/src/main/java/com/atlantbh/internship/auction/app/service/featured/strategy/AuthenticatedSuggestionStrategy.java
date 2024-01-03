package com.atlantbh.internship.auction.app.service.featured.strategy;

import com.atlantbh.internship.auction.app.entity.Item;

import java.util.List;
import java.util.Optional;

public interface AuthenticatedSuggestionStrategy {
    Optional<List<Item>> suggestions(final Integer userId, final String searchQuery, final int itemCount);
}
