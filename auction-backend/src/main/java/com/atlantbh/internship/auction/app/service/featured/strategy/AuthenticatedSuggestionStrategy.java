package com.atlantbh.internship.auction.app.service.featured.strategy;

import com.atlantbh.internship.auction.app.entity.Item;

import java.util.List;

public interface AuthenticatedSuggestionStrategy {
    List<Item> suggestions(Integer userId, String searchQuery, int itemCount);
}
