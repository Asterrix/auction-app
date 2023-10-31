package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.category.CategoryDto;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.repository.CategoryRepository;
import com.atlantbh.internship.auction.app.service.impl.CategoryServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {
    @Mock
    private CategoryRepository repository;

    @InjectMocks
    private CategoryServiceImpl service;

    @Test
    void CategoryService_GetAll_ReturnsListOfCategories() {
        List<Category> categories = List.of(
                new Category(1, "Category1"),
                new Category(2, "Category2"),
                new Category(3, "Category3")
        );

        when(repository.findAll()).thenReturn(categories);
        List<CategoryDto> result = service.getAllCategories();

        assertEquals(categories.size(), result.size());
        verify(repository, times(1)).findAll();
    }
}