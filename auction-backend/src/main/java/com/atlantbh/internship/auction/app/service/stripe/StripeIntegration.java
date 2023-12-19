package com.atlantbh.internship.auction.app.service.stripe;

import com.atlantbh.internship.auction.app.config.stripe.StripeKey;
import com.atlantbh.internship.auction.app.entity.PaymentInfo;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.service.payment_info.PaymentInfoService;
import com.google.gson.Gson;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;

@Service
public class StripeIntegration implements StripeService {
    private final Gson gson = new Gson();
    private final StripePriceCalculator stripePriceCalculator;
    private final PaymentInfoService paymentInfoService;

    private final StripeKey stripeKey;

    public StripeIntegration(@Qualifier("stripePriceCalculatorImpl") final StripePriceCalculator stripePriceCalculator,
                             @Qualifier("paymentInfoServiceImpl") final PaymentInfoService paymentInfoService,
                             final StripeKey stripeKey) {
        this.stripePriceCalculator = stripePriceCalculator;
        this.paymentInfoService = paymentInfoService;
        this.stripeKey = stripeKey;
    }

    @Override
    public String getPublishableKey() {
        return gson.toJson(stripeKey.getPublishableKey());
    }

    @Override
    public void createCustomer(final User user) {
        final String customerSignature = user.getEmail();
        final String customerFullName = String.format("%s %s".formatted(user.getFirstName(), user.getLastName()));

        final CustomerCreateParams params =
                CustomerCreateParams.builder()
                        .setName(customerFullName)
                        .setEmail(customerSignature)
                        .build();

        try {
            final Customer customer = Customer.create(params);
            final PaymentInfo paymentInfo = new PaymentInfo(user, customer.getId());
            savePaymentInfo(paymentInfo);
        } catch (StripeException e) {
            throw new RuntimeException("Error occurred while creating customer");
        }

    }

    @Override
    public String createPaymentIntent(final Long amount, final String currency, final String customer) {

        final PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount)
                .setCurrency(currency)
                .setCustomer(customer)
                .setAutomaticPaymentMethods(PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                        .setEnabled(true)
                        .setAllowRedirects(PaymentIntentCreateParams.AutomaticPaymentMethods.AllowRedirects.NEVER)
                        .build())
                .setSetupFutureUsage(PaymentIntentCreateParams.SetupFutureUsage.OFF_SESSION)
                .build();

        // Used for setting up the Stripe form on the frontend which contains the information about the payment details
        final HashMap<String, String> clientSecret = new HashMap<>();
        try {
            final PaymentIntent paymentIntent = PaymentIntent.create(params);
            clientSecret.put("clientSecret", paymentIntent.getClientSecret());
        } catch (final StripeException e) {
            throw new RuntimeException("Error occurred while trying to create payment intent");
        }

        return gson.toJson(clientSecret);
    }

    @Override
    public String findCustomerByUserId(final Integer userId) {
        return paymentInfoService.findCustomerByUserId(userId);
    }

    @Override
    public void savePaymentInfo(final PaymentInfo paymentInfo) {
        paymentInfoService.savePaymentInfo(paymentInfo);
    }

    @Override
    public Long convertPriceToStripeCents(final BigDecimal itemPrice) {
        return stripePriceCalculator.convertPriceToStripeCents(itemPrice);
    }

}
