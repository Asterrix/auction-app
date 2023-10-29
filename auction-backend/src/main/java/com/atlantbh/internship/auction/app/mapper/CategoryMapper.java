package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.category.CategoryDto;
import com.atlantbh.internship.auction.app.dto.category.SubcategoryDto;
import com.atlantbh.internship.auction.app.entity.Category;

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

    public static SubcategoryDto convertToSubcategoryDto(final CategoryDto category, final Integer subcategoryItemsCount) {
        return new SubcategoryDto(category.id(), category.name(), subcategoryItemsCount);
    }

    public static List<CategoryDto> convertToCategoryDto(final List<Category> categories) {
        Map<Integer, CategoryDto> map = new HashMap<>();
        Map<Integer, Integer> itemsCount = new HashMap<>();

        // Initialise the hashmap with categories
        categories.forEach(category -> {
            CategoryDto categoryDto = new CategoryDto(category.getId(), category.getName(), new ArrayList<>());
            map.put(category.getId(), categoryDto);
            itemsCount.put(category.getId(), category.getItems().size());
        });

        // Add subcategories to parent categories
        categories.forEach(category -> {
            final Category parentCategory = category.getParentCategory();
            if (parentCategory != null) {
                final CategoryDto parent = map.get(parentCategory.getId());
                if (parent != null) {
                    final CategoryDto subcategory = map.get(category.getId());
                    final Integer subcategoryItemsCount = itemsCount.get(category.getId());
                    parent.subcategories().add(convertToSubcategoryDto(subcategory, subcategoryItemsCount));
                }
            }
        });

        // Find and return the top-level categories (those with no parents)
        List<CategoryDto> result = new ArrayList<>();
        categories.forEach(category -> {
            final Category parentCategory = category.getParentCategory();
            if (parentCategory == null) {
                result.add(map.get(category.getId()));
            }
        });

        return result;
    }
}
