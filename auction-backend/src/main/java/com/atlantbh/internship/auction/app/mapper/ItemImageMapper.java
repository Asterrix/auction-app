package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.item.image.ItemImageDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.google.cloud.storage.Blob;

import java.util.List;
import java.util.stream.Collectors;

public final class ItemImageMapper {
    private ItemImageMapper() {
    }

    public static ItemImageDto convertToDto(final ItemImage entity) {
        return new ItemImageDto(
                entity.getId(),
                entity.getImageUrl()
        );
    }

    public static List<ItemImageDto> convertToDto(final List<ItemImage> entityList) {
        return entityList.stream().map(ItemImageMapper::convertToDto).toList();
    }

    public static List<ItemImage> convertFromBlob(final List<Blob> blobList, final Item item) {
        return blobList.stream()
                .map(blob -> new ItemImage(blob.getMediaLink(), item))
                .collect(Collectors.toList());
    }
}
