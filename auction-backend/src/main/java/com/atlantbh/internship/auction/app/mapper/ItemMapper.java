package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;

import java.util.List;

public final class ItemMapper {
    private ItemMapper() {
    }

    public static ItemSummaryDto convertToDto(final Item entity) {
        return new ItemSummaryDto(entity.getId(), entity.getName(), entity.getInitialPrice(), ItemImageMapper.convertToDto(entity.getItemImages()));
    }

    public static List<ItemSummaryDto> convertToDto(final List<Item> entityList) {
        return entityList.stream().map(ItemMapper::convertToDto).toList();
    }
}
