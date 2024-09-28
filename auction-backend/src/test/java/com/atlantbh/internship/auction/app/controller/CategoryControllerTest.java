package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.category.CategoryDto;
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

import java.util.ArrayList;
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
    void getAllCategories_ShouldReturn_StatusOk() throws Exception {
        final String path = "/api/v1/categories";

        final MockHttpServletResponse response = mockMvc
                .perform(get(path).accept(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void getAllCategories_ShouldReturn_Content() throws Exception {
        final String path = "/api/v1/categories";
        final CategoryDto category = new CategoryDto(1, "Cat", new ArrayList<>());
        List<CategoryDto> list = List.of(category);

        given(categoryService.getAllCategories()).willReturn(list);

        final MockHttpServletResponse response = mockMvc
                .perform(get(path).accept(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse();

        JSONAssert.assertEquals(jacksonTester.write(list).getJson(), response.getContentAsString(), false);
    }
}