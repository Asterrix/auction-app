package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.ItemImageDto;
import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.service.ItemService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static com.atlantbh.internship.auction.app.controller.ItemControllerTestConstant.*;
import static org.hamcrest.Matchers.closeTo;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

final class ItemControllerTestConstant {
    public static final int ID = 1;
    public static final String ITEM_NAME = "Item1";
    public static final BigDecimal INITIAL_PRICE = new BigDecimal("20.00");
    public static final String IMAGE_NAME = "Image";
    public static final String IMAGE_URL = "ImageUrl";
}

@ExtendWith(SpringExtension.class)
@WebMvcTest(ItemController.class)
class ItemControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ItemService itemService;

    @Test
    public void ItemController_GetAll_ReturnsListOfItems_StatusOk() throws Exception {
        ItemImageDto itemImageDto = new ItemImageDto(ID, IMAGE_NAME, IMAGE_URL);
        ItemSummaryDto itemSummaryDto = new ItemSummaryDto(ID, ITEM_NAME, INITIAL_PRICE, itemImageDto);
        Page<ItemSummaryDto> mockPage = new PageImpl<>(List.of(itemSummaryDto));

        when(itemService.getAll(anyInt(), anyInt(), anyString(), anyString())).thenReturn(mockPage);

        mockMvc.perform(get("/api/v1/items"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content[0].id").value(ID))
                .andExpect(jsonPath("$.content[0].name").value(ITEM_NAME))
                .andExpect(jsonPath("$.content[0].initialPrice", closeTo(INITIAL_PRICE.floatValue(), 0.01)))
                .andExpect(jsonPath("$.content[0].portrait.id").value(ID))
                .andExpect(jsonPath("$.content[0].portrait.name").value(IMAGE_NAME))
                .andExpect(jsonPath("$.content[0].portrait.imageUrl").value(IMAGE_URL));
    }

}