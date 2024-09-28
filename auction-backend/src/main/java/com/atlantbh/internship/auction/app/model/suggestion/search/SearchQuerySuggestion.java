package com.atlantbh.internship.auction.app.model.suggestion.search;

import java.util.List;

public interface SearchQuerySuggestion {
    List<String> getSearchSuggestion(final List<String> list, final String input);
}
