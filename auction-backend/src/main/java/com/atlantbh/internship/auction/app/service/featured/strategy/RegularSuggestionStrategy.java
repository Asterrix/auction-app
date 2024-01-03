package com.atlantbh.internship.auction.app.service.featured.strategy;

import com.atlantbh.internship.auction.app.entity.Item;

import java.util.List;
import java.util.Optional;

public interface RegularSuggestionStrategy {
    Optional<List<Item>> suggestions(final String searchQuery, final int itemCount);
}
