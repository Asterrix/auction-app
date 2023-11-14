package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.category.CategoryDto;
import com.atlantbh.internship.auction.app.dto.category.SubcategoryDto;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.mapper.CategoryMapper;
import com.atlantbh.internship.auction.app.repository.CategoryRepository;
import com.atlantbh.internship.auction.app.service.CategoryService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository repository;

    public CategoryServiceImpl(final CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        LocalDate currentDate = LocalDate.now();
        List<Category> categories = repository.findAllCategories();
        List<Category> subcategories = repository.findAllSubcategories(currentDate);

        return CategoryMapper.convertToCategoryDto(categories, subcategories);
    }
}
