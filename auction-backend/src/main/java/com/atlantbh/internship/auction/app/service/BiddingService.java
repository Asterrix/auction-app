package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.bid.BidRequest;
import com.atlantbh.internship.auction.app.dto.bid.UserBidsAggregate;

import java.time.LocalDateTime;
import java.util.List;

public interface BiddingService {
    void makeAnOfferOnItem(final BidRequest bidRequest, final LocalDateTime timeOfRequest);

    List<UserBidsAggregate> getUsersBiddingInformation();
}
