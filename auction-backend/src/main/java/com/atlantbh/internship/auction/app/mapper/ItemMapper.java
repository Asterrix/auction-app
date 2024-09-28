package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.projection.ItemImageInfo;
import com.atlantbh.internship.auction.app.projection.ItemInfo;

import java.util.List;

public final class ItemMapper {
    private ItemMapper() {
    }

    public static ItemSummaryDto convertToSummaryDto(final Item entity) {
        return new ItemSummaryDto(entity.getId(), entity.getName(), entity.getInitialPrice(), ItemImageMapper.convertToDto(entity.getItemImages()));
    }

    public static List<ItemSummaryDto> convertToSummaryDto(final List<Item> entityList) {
        return entityList.stream().map(ItemMapper::convertToSummaryDto).toList();
    }

    public static ItemFeaturedDto convertToFeaturedDto(final ItemInfo itemInfo, final ItemImageInfo itemImageInfo) {
        return new ItemFeaturedDto(itemInfo.getId(),
                itemInfo.getName(),
                itemInfo.getDescription(),
                itemInfo.getInitialPrice(),
                ItemImageMapper.convertToDto(itemImageInfo));
    }
}
