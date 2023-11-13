package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.search.SearchSuggestion;

public interface DidYouMeanService {
    SearchSuggestion didYouMean(final String input);
}
