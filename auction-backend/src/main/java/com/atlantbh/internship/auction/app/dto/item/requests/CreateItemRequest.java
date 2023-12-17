package com.atlantbh.internship.auction.app.dto.item.requests;


import com.atlantbh.internship.auction.app.entity.Item;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

/**
 * DTO for {@link Item}
 */

public record CreateItemRequest(
        String name,
        String category,
        String subcategory,
        String description,
        BigDecimal initialPrice,
        ZonedDateTime startTime,
        ZonedDateTime endTime) {
}
