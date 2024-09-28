package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.CategoryDto;
import com.atlantbh.internship.auction.app.entity.Category;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CategoryMapperTest {

    @Test
    void CategoryMapper_TakeEntityAndMapItToCategoryDto() {
        Category category = new Category(100, "Category");

        CategoryDto categoryDto = CategoryMapper.convertToDto(category);

        assertEquals(category.getId(), categoryDto.id());
        assertEquals(category.getName(), categoryDto.name());
    }

    @Test
    void CategoryMapper_TakeListOfEntities_MapThemTo_ListOfCategoryDto() {
        List<Category> categories = List.of(new Category(), new Category());

        List<CategoryDto> result = CategoryMapper.convertToDto(categories);

        assertEquals(categories.size(), result.size());
    }
}