package com.atlantbh.internship.auction.app.service.stripe;

import java.math.BigDecimal;

public interface StripePriceCalculator {
    /**
     * Stripe uses cents to calculate the transfer fee
     */
    Long convertPriceToStripeCents(final BigDecimal itemPrice);
}
