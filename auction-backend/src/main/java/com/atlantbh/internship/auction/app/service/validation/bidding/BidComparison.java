package com.atlantbh.internship.auction.app.service.validation.bidding;

import java.math.BigDecimal;

public interface BidComparison {
    void compareOfferToHighestBid(final BigDecimal offer, final BigDecimal highestBid);
    void compareOfferToInitialPrice(final BigDecimal offer, final BigDecimal initialPrice);
}
