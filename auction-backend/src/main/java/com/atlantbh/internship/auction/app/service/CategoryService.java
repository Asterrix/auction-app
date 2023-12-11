package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.category.CategoryDto;
import com.atlantbh.internship.auction.app.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    Optional<Category> findCategoryByName(final String categoryName);

    List<CategoryDto> getAllCategories();
}
