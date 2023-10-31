package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.category.CategoryDto;
import com.atlantbh.internship.auction.app.entity.Category;

import java.util.List;

public final class CategoryMapper {
    private CategoryMapper() {
    }

    public static CategoryDto convertToDto(final Category category){
        return new CategoryDto(
                category.getId(),
                category.getName()
        );
    }

    public static List<CategoryDto> convertToDto(final List<Category> categories){
        return categories.stream().map(CategoryMapper::convertToDto).toList();
    }
}
