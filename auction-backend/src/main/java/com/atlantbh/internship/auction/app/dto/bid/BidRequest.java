package com.atlantbh.internship.auction.app.dto.bid;

import java.math.BigDecimal;

public record BidRequest(Integer itemId, Integer bidderId, BigDecimal amount) {
}
