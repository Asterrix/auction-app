package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.bid.BidItemSummary;
import com.atlantbh.internship.auction.app.dto.bid.BidNumberCount;
import com.atlantbh.internship.auction.app.dto.bid.UserBidsAggregate;
import com.atlantbh.internship.auction.app.entity.Bid;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.model.impl.TimeRemainingCalculator;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

public final class BidsMapper {
    private BidsMapper() {
    }

    public static BidNumberCount mapToUserItemBidDto(final BigDecimal bid, final Long totalNumberOfBids) {
        return new BidNumberCount(bid, totalNumberOfBids);
    }

    public static BidItemSummary mapToBidItemSummary(final Integer id, final String portrait, final String name) {
        return new BidItemSummary(id, portrait, name);
    }

    public static UserBidsAggregate mapToUserBidsAggregate(final Bid bid, final BigDecimal highestBid) {
        final Item item = bid.getItem();
        final String imageUrl = item.getItemImages().getFirst().getImageUrl();
        final BidItemSummary itemSummary = mapToBidItemSummary(item.getId(), imageUrl, item.getName());
        final String timeRemaining = TimeRemainingCalculator.getTimeRemaining(ZonedDateTime.now(), bid.getItem().getEndTime());
        final BigDecimal currentBid = bid.getAmount();
        final int numberOfBids = item.getUserItemBids().size();

        return new UserBidsAggregate(itemSummary, timeRemaining, currentBid, numberOfBids, highestBid);
    }
}
