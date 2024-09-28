package com.atlantbh.internship.auction.app.dto.bid;

import com.atlantbh.internship.auction.app.entity.Bid;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link Bid}
 */
public record BidNumberCount(BigDecimal highestBid, Long totalNumberOfBids) implements Serializable {
}