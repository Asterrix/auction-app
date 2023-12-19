package com.atlantbh.internship.auction.app.dto.item.requests;

public record GetItemsRequest(
        String name,
        String category,
        String subcategory,
        String orderBy
) {
}
