package com.atlantbh.internship.auction.app.dto;

import com.atlantbh.internship.auction.app.entity.Item;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO for {@link Item}
 */
public record ItemFeaturedDto(
        Integer id,
        String name,
        String description,
        BigDecimal initialPrice,
        List<ItemImageDto> itemImages
) implements Serializable {
}