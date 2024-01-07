package com.atlantbh.internship.auction.app.service.featured.category;

import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public final class CategorySuggestion {

    /**
     * @param items List of items
     * @return Category that has the highest count of mentions in the list of items
     * @throws IllegalArgumentException if most popular category could not be found
     */
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

        return mostPopularCategory.orElseThrow(() -> new IllegalStateException("Most popular category could not be found."));
    }
}
