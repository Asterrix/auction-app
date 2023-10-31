package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.category.CategoryDto;
import com.atlantbh.internship.auction.app.entity.Category;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CategoryMapperTest {
    @Test
    void convertToDto_DtoShouldMatchParameterProperties() {
        final Category category = new Category(100, "Category");

        final CategoryDto categoryDto = CategoryMapper.convertToDto(category);

        assertEquals(category.getId(), categoryDto.id());
        assertEquals(category.getName(), categoryDto.name());
    }
}