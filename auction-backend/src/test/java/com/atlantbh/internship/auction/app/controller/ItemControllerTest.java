package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.ItemImageDto;
import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.service.ItemService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(ItemController.class)
@ExtendWith(MockitoExtension.class)
class ItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ItemService itemService;

    private JacksonTester<Page<ItemSummaryDto>> jacksonTester;

    @BeforeEach
    void setUp() {
        JacksonTester.initFields(this, new ObjectMapper());
    }

    @Test
    public void ItemController_GetAll_ReturnsListOfItems_StatusOk() throws Exception {
        ItemImageDto imageDto = new ItemImageDto(1, "Image1", "ImageUrl");
        ItemSummaryDto item = new ItemSummaryDto(1, "Item", new BigDecimal("80.00"), List.of(imageDto));
        Page<ItemSummaryDto> mockPage = new PageImpl<>(List.of(item));

        given(itemService.getAll(any(Pageable.class))).willReturn(mockPage);

        MockHttpServletResponse response = mockMvc.perform(get("/api/v1/items").accept(MediaType.APPLICATION_JSON)).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        JSONAssert.assertEquals(jacksonTester.write(mockPage).getJson(), response.getContentAsString(), false);
    }

    @Test
    public void ItemController_GetAll_TakesParameters_ReturnsListOfItemsWithSpecifiedParameters_StatusOk() throws Exception {
        ItemImageDto imageDto = new ItemImageDto(1, "Image1", "ImageUrl");
        ItemSummaryDto item = new ItemSummaryDto(1, "Item", new BigDecimal("80.00"), List.of(imageDto));
        Page<ItemSummaryDto> mockPage = new PageImpl<>(List.of(item));

        given(itemService.getAll(any(Pageable.class))).willReturn(mockPage);

        MockHttpServletResponse response = mockMvc.perform(get("/api/v1/items")
                        .accept(MediaType.APPLICATION_JSON)
                        .queryParam("page", "0")
                        .queryParam("size", "3"))
                .andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        JSONAssert.assertEquals(jacksonTester.write(mockPage).getJson(), response.getContentAsString(), false);
        ArgumentCaptor<Pageable> pageableCaptor = ArgumentCaptor.forClass(Pageable.class);
        verify(itemService).getAll(pageableCaptor.capture());
        assertEquals(0, pageableCaptor.getValue().getPageNumber());
        assertEquals(3, pageableCaptor.getValue().getPageSize());
    }
}