package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.dto.ItemFeaturedDto;

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

    public static ItemFeaturedDto convertToFeaturedDto(final Item entity) {
        return new ItemFeaturedDto(entity.getId(), entity.getName(), entity.getDescription(), entity.getInitialPrice(), ItemImageMapper.convertToDto(entity.getItemImages()));
    }
}
