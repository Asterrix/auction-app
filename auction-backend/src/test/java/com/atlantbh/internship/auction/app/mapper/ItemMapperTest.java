package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ItemMapperTest {

    @Test
    void ItemMapper_TakeEntityAndMapItToSummaryDto() {
        Item item = new Item(1, "Item", "Desc", new BigDecimal("0"), LocalDate.EPOCH, LocalDate.EPOCH, List.of());
        ItemImage itemImage = new ItemImage(1, "Image1", "ImageUrl", item);
        item.setItemImages(List.of(itemImage));

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
}