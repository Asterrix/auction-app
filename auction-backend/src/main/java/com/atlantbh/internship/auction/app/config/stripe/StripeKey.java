package com.atlantbh.internship.auction.app.config.stripe;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeKey {

    @Value("${stripe.key}")
    private String key;

    @Value("${stripe.publishableKey}")
    private String publishableKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = key;
    }

    public String getPublishableKey() {
        return publishableKey;
    }
}
