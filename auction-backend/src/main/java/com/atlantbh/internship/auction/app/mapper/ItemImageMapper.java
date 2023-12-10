package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.item.image.ItemImageDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.google.cloud.storage.Blob;

import java.util.ArrayList;
import java.util.List;

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
        List<ItemImage> itemImages = new ArrayList<>();

        blobList.forEach(blob -> {
            itemImages.add(new ItemImage(blob.getMediaLink(), item));
        });

        return itemImages;
    }
}
