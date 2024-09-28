package com.atlantbh.internship.auction.app.config.stripe;

import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class StripeConfig {
    public static final String CURRENCY = "eur";

    // Stripe calculates the price in cents
    public static final BigDecimal PRICE_MULTIPLICAND = new BigDecimal("100");
}
