package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.CategoryDto;
import com.atlantbh.internship.auction.app.service.CategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(CategoryController.class)
@ExtendWith(MockitoExtension.class)
class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoryService categoryService;

    private JacksonTester<List<CategoryDto>> jacksonTester;

    @BeforeEach
    void setUp() {
        JacksonTester.initFields(this, new ObjectMapper());
    }

    @Test
    void CategoryController_GetAllCategories_ReturnsListOfCategories_StatusOk() throws Exception {
        final CategoryDto categoryDto = new CategoryDto(1, "Category1");
        final List<CategoryDto> categoryDtos = List.of(categoryDto);

        given(categoryService.getAll()).willReturn(categoryDtos);

        final MockHttpServletResponse response = mockMvc.perform(get("/api/v1/category").accept(MediaType.APPLICATION_JSON)).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        JSONAssert.assertEquals(jacksonTester.write(categoryDtos).getJson(), response.getContentAsString(), false);
    }
}