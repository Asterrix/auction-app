package com.atlantbh.internship.auction.app.service.stripe;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class StripePriceCalculatorImpl implements StripePriceCalculator {

    @Override
    public Long convertPriceToStripeCents(final BigDecimal itemPrice) {
        final BigDecimal multiplicand = new BigDecimal("100");
        return itemPrice.multiply(multiplicand).longValue();
    }

}
