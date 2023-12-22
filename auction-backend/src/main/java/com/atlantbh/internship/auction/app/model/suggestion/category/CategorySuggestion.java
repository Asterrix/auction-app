package com.atlantbh.internship.auction.app.model.suggestion.category;

import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;

import java.util.List;

public interface CategorySuggestion {
    Category findMostPopularCategory(final List<Item> items);
}
