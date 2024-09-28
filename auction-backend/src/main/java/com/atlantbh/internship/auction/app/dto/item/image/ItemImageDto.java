package com.atlantbh.internship.auction.app.dto.item.image;

import com.atlantbh.internship.auction.app.entity.ItemImage;

import java.io.Serializable;

/**
 * DTO for {@link ItemImage}
 */
public record ItemImageDto(
        Integer id,
        String imageUrl
) implements Serializable {
}