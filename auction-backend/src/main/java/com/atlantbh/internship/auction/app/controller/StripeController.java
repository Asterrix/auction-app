package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.config.claims.ClaimsExtractor;
import com.atlantbh.internship.auction.app.config.stripe.StripeConfig;
import com.atlantbh.internship.auction.app.entity.Bid;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.service.item.ItemService;
import com.atlantbh.internship.auction.app.service.stripe.StripeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/v1/stripe")
public class StripeController {
    private final StripeService stripeService;
    private final ClaimsExtractor claimsExtractor;
    private final ItemService itemService;
    private final StripeConfig stripeConfig;

    public StripeController(final StripeService stripeService,
                            final ClaimsExtractor claimsExtractor,
                            final ItemService itemService,
                            final StripeConfig stripeConfig) {
        this.stripeService = stripeService;
        this.claimsExtractor = claimsExtractor;
        this.itemService = itemService;
        this.stripeConfig = stripeConfig;
    }

    @GetMapping("config")
    public ResponseEntity<String> getPublishableKey() {
        final String publishableKey = stripeService.getPublishableKey();

        return new ResponseEntity<>(publishableKey, HttpStatus.OK);
    }

    @PostMapping("create-payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestParam final Integer itemId) {
        final Integer requestUserId = claimsExtractor.getUserId();

        final String customerId = stripeService.findCustomerByUserId(requestUserId);

        final Item item = itemService
                .findItemById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item with the id of: %d could not be found".formatted(itemId)));

        if (item.getFinished()) {
            throw new ValidationException("Item with the id of: %d has already been purchased".formatted(itemId));
        }

        final Integer ownerId = item.getOwner().getId();
        if (requestUserId.equals(ownerId)) {
            throw new ValidationException("User is not allowed to purchase his own items.");
        }

        final Bid highestBid = item
                .getUserItemBids()
                .stream()
                .max(Comparator.comparing(Bid::getAmount))
                .orElseThrow(() -> new ValidationException("No bids for the item of: %d could be found".formatted(itemId)));

        if (!requestUserId.equals(highestBid.getUser().getId())) {
            throw new ValidationException("User is not the highest bidder and therefore is not allowed to purchase the item.");
        }

        final Long finalPrice = stripeService.convertPriceToStripeCents(highestBid.getAmount());

        final String paymentIntent = stripeService.createPaymentIntent(finalPrice, stripeConfig.getCurrency(), customerId);
        return new ResponseEntity<>(paymentIntent, HttpStatus.OK);
    }

    // There is a potential that stripe purchase will succeed but the item will not be updated duo to connection issues, intentional exits, etc...
    // Stripe handles these cases with the use of webhooks, but for the sake of simplicity this is not implemented, yet.
    @PostMapping("confirm-purchase")
    public ResponseEntity<Void> confirmPurchase(@RequestParam final Integer itemId) {
        final Item item = itemService
                .findItemById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item with the id of: %d could not be found".formatted(itemId)));

        itemService.updateItemFinishedAttribute(item);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
