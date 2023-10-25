package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.projection.ItemImageInfo;
import com.atlantbh.internship.auction.app.projection.ItemInfo;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ItemMapperTest {

    @Test
    void ItemMapper_TakeEntityAndMapItTo_SummaryDto() {
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

    @Test
    void ItemMapper_TakeProjectionsAndMapThemTo_ItemFeaturedDto() {
        final ItemInfo itemInfo = new ItemInfo() {
            @Override
            public Integer getId() {
                return 1;
            }

            @Override
            public String getName() {
                return "Item";
            }

            @Override
            public String getDescription() {
                return "Desc";
            }

            @Override
            public BigDecimal getInitialPrice() {
                return new BigDecimal("92.00");
            }
        };

        final ItemImageInfo itemImageInfo = new ItemImageInfo() {
            @Override
            public Integer getId() {
                return 1;
            }

            @Override
            public String getName() {
                return "Image";
            }

            @Override
            public String getImageUrl() {
                return "ImageUrl";
            }
        };

        ItemFeaturedDto featuredDto = ItemMapper.convertToFeaturedDto(itemInfo, itemImageInfo);

        assertEquals(itemInfo.getId(), featuredDto.id());
        assertEquals(itemInfo.getName(), featuredDto.name());
        assertEquals(itemInfo.getInitialPrice(), featuredDto.initialPrice());
        assertEquals(itemImageInfo.getId(), featuredDto.itemImage().id());
        assertEquals(itemImageInfo.getName(), featuredDto.itemImage().name());
        assertEquals(itemImageInfo.getImageUrl(), featuredDto.itemImage().imageUrl());
    }
}