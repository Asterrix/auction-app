package com.atlantbh.internship.auction.app.dto.item.requests;

public record PriceFilter(
        Integer minPrice,
        Integer maxPrice
) {
}
