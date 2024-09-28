package com.atlantbh.internship.auction.app.service.featured.category;

import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import jakarta.inject.Inject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CategorySuggestionTest {
    private final CategorySuggestion categorySuggestion = new CategorySuggestion();

    @Test
    @DisplayName("There is no category in an empty list of items")
    void testFindMostPopularCategory_WhenThereIsNoCategory_ThrowIllegalArgumentException() {
        final List<Item> items = List.of();

        assertThrows(IllegalStateException.class,
                () -> categorySuggestion.findMostPopularCategory(items),
                "There is no category in an empty list of items.");

    }

    @Test
    @DisplayName("Return category with the most mentions")
    void testFindMostPopularCategory_WhenThereAreMultipleCategories_ReturnCategoryWithTheMostMentions() {
        final Category categoryOne = new Category();
        final Category categoryTwo = new Category();
        categoryOne.setName("Category One");
        categoryTwo.setName("Category Two");
        final List<Item> items = List.of(new Item(), new Item(), new Item());
        items.get(0).setCategory(categoryOne);
        items.get(1).setCategory(categoryOne);
        items.get(2).setCategory(categoryTwo);

        final Category mostPopularCategory = categorySuggestion.findMostPopularCategory(items);

        assertEquals(categoryOne, mostPopularCategory, "Category One should be the most popular category.");
    }
}