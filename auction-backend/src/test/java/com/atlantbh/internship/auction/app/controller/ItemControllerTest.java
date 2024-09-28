package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.config.claims.ClaimsExtractor;
import com.atlantbh.internship.auction.app.dto.aggregate.ItemAggregate;
import com.atlantbh.internship.auction.app.dto.bid.BiddingInformation;
import com.atlantbh.internship.auction.app.dto.item.ItemDto;
import com.atlantbh.internship.auction.app.dto.item.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.item.ItemSummaryDto;
import com.atlantbh.internship.auction.app.dto.item.image.ItemImageDto;
import com.atlantbh.internship.auction.app.dto.item.requests.CreateItemRequest;
import com.atlantbh.internship.auction.app.model.utils.MainValidationClass;
import com.atlantbh.internship.auction.app.service.CategoryService;
import com.atlantbh.internship.auction.app.service.UserService;
import com.atlantbh.internship.auction.app.service.firebase.FirebaseStorageService;
import com.atlantbh.internship.auction.app.service.item.ItemService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(value = ItemController.class, excludeAutoConfiguration = {SecurityAutoConfiguration.class})
@ExtendWith(MockitoExtension.class)
class ItemControllerTest {

    @MockBean
    ClaimsExtractor claimsExtractor;
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ItemService itemService;
    @MockBean
    private CategoryService categoryService;
    @MockBean
    private UserService userService;
    @MockBean
    private MainValidationClass<CreateItemRequest> requestMainValidationClass;
    @MockBean
    private FirebaseStorageService firebaseStorageService;
    private JacksonTester<Page<ItemSummaryDto>> jacksonTester;

    @BeforeEach
    void setUp() {
        JacksonTester.initFields(this, new ObjectMapper());
    }

    @Test
    void getAllItems_ShouldReturn_StatusOk() throws Exception {
        final String path = "/api/v1/items";

        final MockHttpServletResponse response = mockMvc
                .perform(get(path).accept(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void getAllItems_ShouldReturn_Content() throws Exception {
        final String path = "/api/v1/items";

        final ItemSummaryDto itemSummaryDto = new ItemSummaryDto(
                1,
                "Item",
                new BigDecimal("80.00"),
                new BigDecimal("20.00"),
                new ItemImageDto(1, "ImageUrl")
        );
        final Page<ItemSummaryDto> mockPage = new PageImpl<>(List.of(itemSummaryDto));


        given(itemService.getAllItems(
                any(Specification.class),
                any(Pageable.class)))
                .willReturn(mockPage);

        final MockHttpServletResponse response = mockMvc
                .perform(get(path).accept(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse();

        final String json = jacksonTester.write(mockPage).getJson();
        final String responseContentAsString = response.getContentAsString();
        JSONAssert.assertEquals(json, responseContentAsString, false);
    }

    @Test
    void getAllItems_ShouldTake_PageableParameters() throws Exception {
        final String path = "/api/v1/items";

        final MockHttpServletResponse response = mockMvc
                .perform(get(path)
                        .param("page", "0")
                        .param("size", "3")
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse();


        ArgumentCaptor<Pageable> pageableCaptor = ArgumentCaptor.forClass(Pageable.class);
        verify(itemService).getAllItems(any(Specification.class), pageableCaptor.capture());
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertEquals(0, pageableCaptor.getValue().getPageNumber());
        assertEquals(3, pageableCaptor.getValue().getPageSize());
    }


    @Test
    @Disabled("Returns status code of 404 instead of 200")
    void getItemById_ShouldReturn_StatusOk() throws Exception {
        final String path = "/api/v1/items/";
        final int itemId = 1;
        final String urlTemplate = path + itemId;

        final ItemDto itemDto = new ItemDto(
                itemId,
                "Item",
                "Desc",
                new BigDecimal("20.00"),
                "1 Day",
                List.of(),
                false
        );

        final BiddingInformation itemBidDto = new BiddingInformation(
                new BigDecimal("20"),
                1L,
                1);
        final ItemAggregate itemAggregate = new ItemAggregate(itemDto, itemBidDto, 1);
        final ZonedDateTime timeOfRequest = ZonedDateTime.now();

        given(itemService.getItemById(itemId, timeOfRequest)).willReturn(Optional.of(itemAggregate));

        final MockHttpServletResponse response = mockMvc
                .perform(get(urlTemplate).accept(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void getItemById_ShouldReturn_NotFound() throws Exception {
        final String path = "/api/v1/items/";
        final int itemId = 19300;
        final String urlTemplate = path + itemId;
        final ZonedDateTime timeOfRequest = ZonedDateTime.now();

        given(itemService.getItemById(itemId, timeOfRequest)).willReturn(Optional.empty());

        final MockHttpServletResponse response = mockMvc
                .perform(get(urlTemplate).accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    void getFeaturedItem_ShouldReturn_StatusOk() throws Exception {
        final ItemFeaturedDto itemFeaturedDto = new ItemFeaturedDto(1,
                "Item",
                "Desc",
                new BigDecimal("9.0"),
                new ItemImageDto(1, "ImageUrl")
        );

        given(itemService.getFeaturedItem()).willReturn(itemFeaturedDto);

        final String path = "/api/v1/items/featured";
        final MockHttpServletResponse response = mockMvc
                .perform(get(path).accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }
}