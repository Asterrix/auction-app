package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.ItemImageDto;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.projection.ItemImageInfo;

import java.util.List;

public final class ItemImageMapper {
    private ItemImageMapper() {
    }

    public static ItemImageDto convertToDto(final ItemImage entity) {
        return new ItemImageDto(entity.getId(), entity.getName(), entity.getImageUrl());
    }

    public static List<ItemImageDto> convertToDto(final List<ItemImage> entityList) {
        return entityList.stream().map(ItemImageMapper::convertToDto).toList();
    }

    public static ItemImageDto convertToDto(final ItemImageInfo imageInfo) {
        return new ItemImageDto(imageInfo.getId(), imageInfo.getName(), imageInfo.getImageUrl());
    }
}
