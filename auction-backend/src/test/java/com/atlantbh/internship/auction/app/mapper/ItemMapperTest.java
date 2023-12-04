package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.item.ItemDto;
import com.atlantbh.internship.auction.app.dto.item.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.item.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ItemMapperTest {

    private Item item;
    private ItemImage itemImage;

    @BeforeEach
    void setUp() {
        item = new Item(
                "Item",
                "Desc",
                new BigDecimal("0"),
                ZonedDateTime.now(),
                ZonedDateTime.now(),
                List.of(),
                new Category(1, "Category"),
                new User());

        item.setId(1);
        itemImage = new ItemImage(1, "Image1", "ImageUrl", item);
        item.setItemImages(List.of(itemImage));
    }

    @Test
    void convertToSummaryDto_DtoShouldMatchParameterProperties() {
        final ItemSummaryDto itemSummaryDto = ItemMapper.convertToSummaryDto(item);

        assertEquals(item.getId(), itemSummaryDto.id());
        assertEquals(item.getName(), itemSummaryDto.name());
        assertEquals(item.getInitialPrice(), itemSummaryDto.initialPrice());
        assertEquals(item.getItemImages().getFirst().getId(), itemSummaryDto.thumbnail().id());
    }

    @Test
    void convertToItemDto_DtoShouldMatchParameterProperties() {
        final ItemDto itemDto = ItemMapper.convertToItemDto(item, ZonedDateTime.now());

        assertEquals(item.getId(), itemDto.id());
        assertEquals(item.getName(), itemDto.name());
        assertEquals(item.getDescription(), itemDto.description());
        assertEquals(item.getInitialPrice(), itemDto.initialPrice());
        assertEquals(item.getItemImages().size(), itemDto.images().size());
        assertEquals(item.getItemImages().getFirst().getId(), itemDto.images().getFirst().id());
        assertEquals(item.getItemImages().getFirst().getName(), itemDto.images().getFirst().name());
        assertEquals(item.getItemImages().getFirst().getImageUrl(), itemDto.images().getFirst().imageUrl());
    }

    @Test
    void convertToFeaturedDto_DtoShouldMatchParameterProperties() {
        final ItemFeaturedDto featuredDto = ItemMapper.convertToFeaturedDto(item, itemImage);

        assertEquals(item.getId(), featuredDto.id());
        assertEquals(item.getName(), featuredDto.name());
        assertEquals(item.getDescription(), featuredDto.description());
        assertEquals(item.getInitialPrice(), featuredDto.initialPrice());
        assertEquals(item.getItemImages().getFirst().getId(), featuredDto.thumbnail().id());
        assertEquals(item.getItemImages().getFirst().getName(), featuredDto.thumbnail().name());
        assertEquals(item.getItemImages().getFirst().getImageUrl(), featuredDto.thumbnail().imageUrl());
    }
}
