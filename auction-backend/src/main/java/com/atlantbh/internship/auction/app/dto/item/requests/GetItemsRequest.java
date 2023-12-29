package com.atlantbh.internship.auction.app.dto.item.requests;

import java.util.List;

public record GetItemsRequest(
        String name,
        List<CategoryRequest> categories,
        String orderBy
) {
}
