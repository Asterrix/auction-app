package com.atlantbh.internship.auction.app.dto.item;


import com.atlantbh.internship.auction.app.entity.Item;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

/**
 * DTO for {@link Item}
 */

public record CreateItemRequest(
        String name,
        Integer category,
        Integer subcategory,
        String description,
        List<String> images,
        BigDecimal initialPrice,
        ZonedDateTime startTime,
        ZonedDateTime endTime) {
}
