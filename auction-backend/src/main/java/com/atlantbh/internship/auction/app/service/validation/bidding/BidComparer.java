package com.atlantbh.internship.auction.app.service.validation.bidding;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class BidComparer implements BidComparison {
    @Override
    public void compareOfferToHighestBid(final BigDecimal offer, final BigDecimal highestBid) {
        if (offer.compareTo(highestBid) <= 0) {
            throw new ValidationException("Your bid must be greater than the current one.");
        }
    }

    @Override
    public void compareOfferToInitialPrice(final BigDecimal offer, final BigDecimal initialPrice) {
        if (offer.compareTo(initialPrice) < 0) {
            throw new ValidationException("Initial bid must match or exceed the starting price.");
        }
    }
}
