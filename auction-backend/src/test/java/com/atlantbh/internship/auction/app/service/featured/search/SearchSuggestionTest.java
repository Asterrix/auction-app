package com.atlantbh.internship.auction.app.service.featured.search;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.springframework.test.util.AssertionErrors.assertEquals;

class SearchSuggestionTest {
    private final SearchSuggestion searchSuggestion = new SearchSuggestion();

    @Test
    @DisplayName("Return Pineapple for input pn apple")
    void testCalculateSimilarity_ReturnClosestMatch() {
        final List<String> searchList = List.of(
                "Apple",
                "Pineapple",
                "Orange",
                "Banana",
                "Raspberry"
        );
        final String inputStr = "pne apple";

        final List<String> searchSuggestions = searchSuggestion.createSearchSuggestion(searchList, inputStr);

        assertEquals("Pineapple should be the closest match", searchList.get(1).toLowerCase(), searchSuggestions.getFirst().toLowerCase());
        assertEquals("Apple should be the second closest match", searchList.get(0).toLowerCase(), searchSuggestions.get(1).toLowerCase());
    }

    @Test
    @DisplayName("One string is longer than another.")
    void testGetSearchSuggestion_WhenOneStringIsLongerThanAnother_DontThrowIndexOutOfBoundsException() {
        final List<String> list = List.of("Pineapple");
        final String input = "Apple";

        assertDoesNotThrow(() -> searchSuggestion.createSearchSuggestion(list, input), "Index is out of bounds.");
    }
}