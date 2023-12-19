package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.category.CategoryDto;
import com.atlantbh.internship.auction.app.dto.category.SubcategoryDto;
import com.atlantbh.internship.auction.app.entity.Category;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class CategoryMapper {

    private CategoryMapper() {
    }

    public static CategoryDto convertToCategoryDto(final Category category) {
        return new CategoryDto(category.getId(), category.getName(), List.of());
    }

    public static SubcategoryDto convertToSubcategoryDto(final Category category, final Integer subcategoryItemsCount) {
        return new SubcategoryDto(category.getId(), category.getName(), subcategoryItemsCount);
    }

    public static List<CategoryDto> convertToCategoryDto(final List<Category> categories, final List<Category> subcategories) {
        Map<Integer, CategoryDto> map = new HashMap<>();

        // Initialise the hashmap with categories
        categories.forEach(category -> {
            CategoryDto categoryDto = new CategoryDto(category.getId(), category.getName(), new ArrayList<>());
            map.put(category.getId(), categoryDto);
        });

        // Add subcategories to parent categories
        subcategories.forEach(subcategory -> {
            final Category parentCategory = subcategory.getParentCategory();
            final CategoryDto parent = map.get(parentCategory.getId());
            parent.subcategories()
                    .add(
                            convertToSubcategoryDto(
                                    subcategory,
                                    subcategory
                                            .getItems()
                                            .stream()
                                            .filter(item -> item.getEndTime().isAfter(ZonedDateTime.now()))
                                            .toList()
                                            .size())
                    );
        });

        // Find and return the top-level categories (those with no parents)
        List<CategoryDto> result = new ArrayList<>();
        map.forEach((key, value) -> result.add(value));

        return result;
    }
}
