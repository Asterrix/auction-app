package com.atlantbh.internship.auction.app.model.suggestion.category;

import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public final class ItemCategorySuggestion implements CategorySuggestion {
    @Override
    public Category findMostPopularCategory(final List<Item> items) {
        final Optional<Category> mostPopularCategory = items
                .stream()
                .collect(Collectors.toMap(
                        Item::getCategory,
                        category -> 1,
                        Integer::sum))
                .entrySet().stream()
                .max(Comparator.comparingInt(Map.Entry::getValue))
                .map(Map.Entry::getKey);

        return mostPopularCategory.orElseThrow(() -> new IllegalArgumentException("Most popular category could not be found."));
    }
}
