package com.atlantbh.internship.auction.app.config.stripe;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class StripeConfig {
    @Value("${stripe.currency}")
    private String currency;

    // Stripe calculates the price in cents
    @Value("${stripe.price-multiplier}")
    private BigDecimal priceMultiplier;

    public String getCurrency() {
        return currency;
    }

    public BigDecimal getPriceMultiplier() {
        return priceMultiplier;
    }
}
