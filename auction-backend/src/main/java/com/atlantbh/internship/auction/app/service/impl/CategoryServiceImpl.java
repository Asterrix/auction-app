package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.category.CategoryDto;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.mapper.CategoryMapper;
import com.atlantbh.internship.auction.app.repository.CategoryRepository;
import com.atlantbh.internship.auction.app.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository repository;

    public CategoryServiceImpl(final CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Category> findCategoryByName(final String categoryName) {
        return repository.findByNameAllIgnoreCase(categoryName);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        final List<Category> categories = repository.findByParentCategoryNull();
        final List<Category> subcategories = repository.findByParentCategoryNotNull();

        return CategoryMapper.convertToCategoryDto(categories, subcategories);
    }
}
