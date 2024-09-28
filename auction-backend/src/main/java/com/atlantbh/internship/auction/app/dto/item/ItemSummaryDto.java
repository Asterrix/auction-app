package com.atlantbh.internship.auction.app.dto.item;

import com.atlantbh.internship.auction.app.dto.item.image.ItemImageDto;
import com.atlantbh.internship.auction.app.entity.Item;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link Item}
 */
public record ItemSummaryDto(
        Integer id,
        String name,
        BigDecimal initialPrice,
        ItemImageDto thumbnail
) implements Serializable {
}