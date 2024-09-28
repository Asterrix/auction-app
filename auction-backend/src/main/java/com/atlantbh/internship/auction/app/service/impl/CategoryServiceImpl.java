package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.CategoryDto;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.mapper.CategoryMapper;
import com.atlantbh.internship.auction.app.repository.CategoryRepository;
import com.atlantbh.internship.auction.app.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository repository;

    public CategoryServiceImpl(final CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<CategoryDto> getAll() {
        List<Category> categories = repository.findAll();
        return CategoryMapper.convertToDto(categories);
    }
}
