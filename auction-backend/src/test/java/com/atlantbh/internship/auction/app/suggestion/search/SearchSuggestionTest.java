package com.atlantbh.internship.auction.app.suggestion.search;

import com.atlantbh.internship.auction.app.model.suggestion.search.SearchQuerySuggestion;
import com.atlantbh.internship.auction.app.model.suggestion.search.SearchSuggestion;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

class SearchSuggestionTest {
    private final SearchQuerySuggestion searchSuggestion = new SearchSuggestion();

    @Test
    void testGetSearchSuggestion_WhenInputIsNotEmpty_ReturnMostSimilarStrings() {
        final List<String> list = List.of("Apple", "Pine apple", "Orange", "Banana");
        final String input = "Apple";

        final List<String> suggestions = searchSuggestion.getSearchSuggestion(list, input);

        assertEquals(4, suggestions.size());
        assertEquals("Apple", suggestions.getFirst());
        assertEquals("Orange", suggestions.get(1));
        assertEquals("Banana", suggestions.get(2));
        assertEquals("Pine apple", suggestions.getLast()); // Last because of the size difference.
    }

    @Test
    @DisplayName("One string is longer than another.")
    void testGetSearchSuggestion_WhenOneStringIsLongerThanAnother_DontThrowIndexOutOfBoundsException() {
        final List<String> list = List.of("Pine apple");
        final String input = "Apple";

        assertDoesNotThrow(() -> searchSuggestion.getSearchSuggestion(list, input), "Index is out of bounds.");
    }
}