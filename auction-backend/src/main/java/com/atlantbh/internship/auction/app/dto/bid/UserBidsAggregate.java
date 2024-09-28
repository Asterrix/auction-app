package com.atlantbh.internship.auction.app.dto.bid;

import com.atlantbh.internship.auction.app.entity.Bid;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link Bid}
 */
public record UserBidsAggregate(
        TableItemSummary item,
        String timeRemaining,
        BigDecimal biddingOffer,
        Integer numberOfBids,
        BigDecimal highestBid
) implements Serializable {
}