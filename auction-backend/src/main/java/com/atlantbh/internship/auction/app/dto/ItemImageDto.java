package com.atlantbh.internship.auction.app.dto;

import com.atlantbh.internship.auction.app.entity.ItemImage;

import java.io.Serializable;

/**
 * DTO for {@link ItemImage}
 */
public record ItemImageDto(
        Integer id,
        String name,
        String imageUrl) implements Serializable {
}