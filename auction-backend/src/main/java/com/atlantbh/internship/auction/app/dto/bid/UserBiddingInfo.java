package com.atlantbh.internship.auction.app.dto.bid;

import com.atlantbh.internship.auction.app.entity.UserItemBid;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link UserItemBid}
 */
public record UserBiddingInfo(
        BiddingItemInfo item,
        String timeLeft,
        BigDecimal biddingOffer,
        int numberOfBids,
        BigDecimal highestBid
) implements Serializable {
}