package com.atlantbh.internship.auction.app.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

public record ItemSummaryDto(
        Integer id,
        String name,
        BigDecimal initialPrice,
        List<ItemImageDto> itemImages) implements Serializable {
}