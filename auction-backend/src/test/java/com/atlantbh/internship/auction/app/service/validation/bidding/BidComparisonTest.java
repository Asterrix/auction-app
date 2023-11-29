package com.atlantbh.internship.auction.app.service.validation.bidding;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class BidComparisonTest {
    BidComparison bidComparer;

    @BeforeEach
    void setUp() {
        bidComparer = new BidComparer();
    }

    @Test
    @DisplayName("Offer is less than the current highest bid")
    void compareOfferToHighestBid_WhenOfferIsLowerThanHighestBid_ThrowValidationException() {
        final BigDecimal offer = new BigDecimal("70.00");
        final BigDecimal highestBid = new BigDecimal("92.00");

        final ValidationException validationException = assertThrows(
                ValidationException.class, () -> bidComparer.compareOfferToHighestBid(offer, highestBid));

        assertEquals("Your bid must be greater than the current one.", validationException.getMessage());
    }


    @Test
    @DisplayName("The offer is lower than the starting price")
    void compareOfferToInitialPrice_WhenOfferIsLowerThanInitialPrice_ThrowValidationException() {
        final BigDecimal offer = new BigDecimal("60");
        final BigDecimal initialItemPrice = new BigDecimal("70");


        final ValidationException validationException = assertThrows(
                ValidationException.class, () -> bidComparer.compareOfferToInitialPrice(offer, initialItemPrice));

        assertEquals("Initial bid must match or exceed the starting price.", validationException.getMessage());
    }

    @Test
    @DisplayName("The offer matches the initialPrice")
    void compareOfferToInitialPrice_WhenThereAreNoBidsAndUserMakesBidMatchingTheInitialPrice_ContinueExecution() {
        final BigDecimal offer = new BigDecimal("50.50");
        final BigDecimal initialPrice = new BigDecimal("50.50");

        assertEquals(offer, initialPrice);
        assertDoesNotThrow(() -> bidComparer.compareOfferToInitialPrice(offer, initialPrice));
    }
}