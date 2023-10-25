package com.atlantbh.internship.auction.app.dto;

import com.atlantbh.internship.auction.app.entity.Item;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link Item}
 */
public record ItemFeaturedDto(
        Integer id,
        String name,
        String description,
        BigDecimal initialPrice,
        ItemImageDto itemImage
) implements Serializable {
}