package com.atlantbh.internship.auction.app.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record ItemDto(
        Integer id,
        String name,
        String description,
        BigDecimal initialPrice,
        LocalDate startDate,
        LocalDate endDate,
        List<ItemImageDto> itemImages) implements Serializable {
}