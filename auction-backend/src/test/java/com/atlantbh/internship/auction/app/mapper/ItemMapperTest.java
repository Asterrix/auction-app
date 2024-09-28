package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.ItemDto;
import com.atlantbh.internship.auction.app.dto.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ItemMapperTest {

    private Item item;
    private ItemImage itemImage;

    @BeforeEach
    void setUp() {
        item = new Item(1, "Item", "Desc", new BigDecimal("0"), LocalDate.EPOCH, LocalDate.EPOCH, List.of());
        itemImage = new ItemImage(1, "Image1", "ImageUrl", item);
        item.setItemImages(List.of(itemImage));
    }

    @Test
    void ItemMapper_TakeEntityAndMapItTo_SummaryDto() {
        ItemSummaryDto itemSummaryDto = ItemMapper.convertToSummaryDto(item);

        assertEquals(item.getId(), itemSummaryDto.id());
        assertEquals(item.getName(), itemSummaryDto.name());
        assertEquals(item.getInitialPrice(), itemSummaryDto.initialPrice());
        assertEquals(item.getItemImages().getFirst().getId(), itemSummaryDto.itemImages().getFirst().id());
        assertEquals(item.getItemImages().getFirst().getName(), itemSummaryDto.itemImages().getFirst().name());
        assertEquals(item.getItemImages().getFirst().getImageUrl(), itemSummaryDto.itemImages().getFirst().imageUrl());
    }

    @Test
    void ItemMapper_TakeListOfEntities_MapThemTo_ListOfSummaryDto() {
        List<Item> items = List.of(new Item(), new Item(), new Item());

        List<ItemSummaryDto> result = ItemMapper.convertToSummaryDto(items);

        assertEquals(items.size(), result.size());
    }

    @Test
    void ItemMapper_TakeProjections_AndMapThemTo_ItemFeaturedDto() {
        ItemFeaturedDto featuredDto = ItemMapper.convertToFeaturedDto(item, itemImage);

        assertEquals(item.getId(), featuredDto.id());
        assertEquals(item.getName(), featuredDto.name());
        assertEquals(item.getDescription(), featuredDto.description());
        assertEquals(item.getInitialPrice(), featuredDto.initialPrice());
        assertEquals(item.getItemImages().getFirst().getId(), featuredDto.itemImage().id());
        assertEquals(item.getItemImages().getFirst().getName(), featuredDto.itemImage().name());
        assertEquals(item.getItemImages().getFirst().getImageUrl(), featuredDto.itemImage().imageUrl());
    }

    @Test
    void ItemMapper_TakeEntityAndMapItTo_ItemDto() {
        ItemDto itemDto = ItemMapper.convertToItemDto(item);

        assertEquals(item.getId(), itemDto.id());
        assertEquals(item.getName(), itemDto.name());
        assertEquals(item.getDescription(), itemDto.description());
        assertEquals(item.getInitialPrice(), itemDto.initialPrice());
        assertEquals(item.getItemImages().size(), itemDto.itemImages().size());
        assertEquals(item.getItemImages().getFirst().getId(), itemDto.itemImages().getFirst().id());
        assertEquals(item.getItemImages().getFirst().getName(), itemDto.itemImages().getFirst().name());
        assertEquals(item.getItemImages().getFirst().getImageUrl(), itemDto.itemImages().getFirst().imageUrl());
    }
}