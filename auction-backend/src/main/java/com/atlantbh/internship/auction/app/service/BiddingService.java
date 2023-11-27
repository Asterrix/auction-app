package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.bid.BidRequest;

public interface BiddingService {
    void makeAnOfferOnItem(final BidRequest bidRequest);
}
