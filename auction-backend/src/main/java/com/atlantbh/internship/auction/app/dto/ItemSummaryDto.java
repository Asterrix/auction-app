package com.atlantbh.internship.auction.app.dto;

import java.io.Serializable;
import java.math.BigDecimal;

public record ItemSummaryDto(
        Integer id,
        String name,
        BigDecimal initialPrice,
        ItemImageDto portrait) implements Serializable {
}