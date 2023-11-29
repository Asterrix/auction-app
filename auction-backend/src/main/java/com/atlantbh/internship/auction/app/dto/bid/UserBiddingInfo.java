package com.atlantbh.internship.auction.app.dto.bid;

import com.atlantbh.internship.auction.app.entity.UserItemBid;

import java.io.Serializable;

/**
 * DTO for {@link UserItemBid}
 */
public record UserBiddingInfo(
        BiddingItem item,
        String timeLeft,
        String price,
        int numberOfBids,
        String highestBid
) implements Serializable {
}