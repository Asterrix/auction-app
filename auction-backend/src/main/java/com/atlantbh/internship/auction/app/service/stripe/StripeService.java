package com.atlantbh.internship.auction.app.service.stripe;

import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.service.payment_info.PaymentInfoService;

public interface StripeService extends StripePriceCalculator, PaymentInfoService {
    String getPublishableKey();

    void createCustomer(final User user);

    String createPaymentIntent(final Long amount, final String currency, final String customerId);
}
