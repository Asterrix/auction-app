package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.bid.UserBiddingInfo;
import com.atlantbh.internship.auction.app.dto.bid.BidRequest;

import java.util.List;

public interface BiddingService {
    void makeAnOfferOnItem(final BidRequest bidRequest);

    List<UserBiddingInfo> getUsersBiddingInformation();
}
