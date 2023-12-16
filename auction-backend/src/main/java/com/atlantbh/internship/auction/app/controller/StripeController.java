package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.config.claims.ClaimsExtractor;
import com.atlantbh.internship.auction.app.entity.Bid;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.service.ItemService;
import com.atlantbh.internship.auction.app.service.stripe.StripeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/v1/stripe")
public class StripeController {
    private final StripeService stripeService;
    private final ClaimsExtractor claimsExtractor;
    private final ItemService itemService;


    public StripeController(final StripeService stripeService,
                            final ClaimsExtractor claimsExtractor,
                            final ItemService itemService) {
        this.stripeService = stripeService;
        this.claimsExtractor = claimsExtractor;
        this.itemService = itemService;
    }

    @GetMapping("config")
    public ResponseEntity<String> getPublishableKey() {
        final String publishableKey = stripeService.getPublishableKey();

        return new ResponseEntity<>(publishableKey, HttpStatus.OK);
    }

    @PostMapping("create-payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestParam final Integer itemId) {
        final Integer userId = claimsExtractor.getUserId();

        final String customerId = stripeService.findCustomerByUserId(userId);
        if (customerId.isBlank()) {
            throw new NoSuchElementException("Customer could not be found for userId: %d".formatted(userId));
        }

        final BigDecimal itemPrice = itemService.findItemById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item with the id of: %d could not be found".formatted(itemId)))
                .getUserItemBids()
                .stream()
                .max(Comparator.comparing(Bid::getAmount))
                .orElseThrow(() -> new ValidationException("No bids for the item of: %d could be found".formatted(itemId)))
                .getAmount();

        final Long finalPrice = stripeService.convertPriceToStripeCents(itemPrice);

        final String paymentIntent = stripeService.createPaymentIntent(finalPrice, "eur", customerId);
        return new ResponseEntity<>(paymentIntent, HttpStatus.OK);
    }

    @PostMapping("confirm-purchase")
    public ResponseEntity<Void> confirmPurchase(@RequestParam final Integer itemId) {
        final Item item = itemService.findItemById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item with the id of: %d could not be found".formatted(itemId)));

        itemService.updateItemFinishedAttribute(item);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
