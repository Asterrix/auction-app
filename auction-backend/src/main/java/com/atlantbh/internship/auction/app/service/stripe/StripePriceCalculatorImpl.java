package com.atlantbh.internship.auction.app.service.stripe;

import com.atlantbh.internship.auction.app.config.stripe.StripeConfig;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class StripePriceCalculatorImpl implements StripePriceCalculator {
    private final StripeConfig stripeConfig;

    public StripePriceCalculatorImpl(final StripeConfig stripeConfig) {
        this.stripeConfig = stripeConfig;
    }

    @Override
    public Long convertPriceToStripeCents(final BigDecimal itemPrice) {
        return itemPrice.multiply(stripeConfig.getPriceMultiplier()).longValue();
    }

}
