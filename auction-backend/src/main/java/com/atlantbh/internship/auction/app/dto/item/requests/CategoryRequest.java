package com.atlantbh.internship.auction.app.dto.item.requests;

import java.util.List;

public record CategoryRequest(
        String category,
        List<String> subcategories
) {
}
