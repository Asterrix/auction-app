package com.atlantbh.internship.auction.app.service.featured.strategy;

import com.atlantbh.internship.auction.app.entity.Item;

import java.util.List;

public interface RegularSuggestionStrategy {
    List<Item> suggestions(String searchQuery, int itemCount);
}
