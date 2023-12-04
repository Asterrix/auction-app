package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.bid.BidRequest;
import com.atlantbh.internship.auction.app.dto.bid.UserBidsAggregate;

import java.time.ZonedDateTime;
import java.util.List;

public interface BiddingService {
    void makeAnOfferOnItem(final BidRequest bidRequest, final ZonedDateTime timeOfRequest);

    List<UserBidsAggregate> getUserBiddingHistory();
}
