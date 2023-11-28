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
    void getAllCategories_ShouldReturnListOfCategories() {
        List<Category> categories = List.of(
                new Category(1, "Category1"),
                new Category(2, "Category2"),
                new Category(3, "Category3")
        );
        List<Category> subcategories = List.of(
                new Category(1, "Category1", categories.getFirst()),
                new Category(2, "Category2", categories.get(1)),
                new Category(3, "Category3", categories.getLast())
        );

        when(repository.findAllCategories()).thenReturn(categories);
        when(repository.findAllSubcategories()).thenReturn(subcategories);
        List<CategoryDto> result = service.getAllCategories();

        assertEquals(categories.size(), result.size());
        verify(repository, times(1)).findAllCategories();
        verify(repository, times(1)).findAllSubcategories();
    }
}