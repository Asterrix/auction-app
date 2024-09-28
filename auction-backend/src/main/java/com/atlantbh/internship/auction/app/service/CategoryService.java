package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.category.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getAllCategories();
}
