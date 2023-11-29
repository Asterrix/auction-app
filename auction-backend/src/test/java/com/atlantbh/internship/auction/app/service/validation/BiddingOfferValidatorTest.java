package com.atlantbh.internship.auction.app.service.validation;

import com.atlantbh.internship.auction.app.exception.AllowedDecimalScaleException;
import com.atlantbh.internship.auction.app.exception.FractionalDivisionIsNotZero;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.model.utils.Validator;
import com.atlantbh.internship.auction.app.service.validation.bidding.BiddingOfferValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class BiddingOfferValidatorTest {

    Validator<BigDecimal> validator;

    @BeforeEach
    void setUp() {
        validator = new BiddingOfferValidator();
    }

    @Test
    @DisplayName("Offer is above allowed decimal scale")
    void makeAnOfferOnItem_offerDecimalScaleIsGreaterThanAllowed_throwValidationException() {
        final BigDecimal offer = new BigDecimal("50.500000000000000");

        final ValidationException result = assertThrows(AllowedDecimalScaleException.class,
                () -> validator.validate(offer));

        assertEquals("Decimal precision must be limited to no more than two decimal places.", result.getMessage());
    }

    @Test
    @DisplayName("Offer is made with 2 decimal precision")
    void makeAnOfferOnItem_offerDecimalScaleIsTwo_continueExecution() {
        final BigDecimal offer = new BigDecimal("50.00");

        assertDoesNotThrow(() -> {
            try {
                validator.validate(offer);
            } catch (AllowedDecimalScaleException e) {
                fail("Offer is within allowed decimal scale.");
            }
        });
    }

    @Test
    @DisplayName("Offer is made with 1 decimal precision")
    void makeAnOfferOnItem_offerDecimalScaleIsOne_continueExecution() {
        final BigDecimal offer = new BigDecimal("50.0");

        assertDoesNotThrow(() -> {
            try {
                validator.validate(offer);
            } catch (AllowedDecimalScaleException e) {
                fail("Offer is within allowed decimal scale.");
            }
        });
    }

    @Test
    @DisplayName("Offer is made with 0 decimal precision")
    void makeAnOfferOnItem_offerDecimalScaleIsZeroWithDot_continueExecution() {
        final BigDecimal offer = new BigDecimal("50.");

        assertDoesNotThrow(() -> {
            try {
                validator.validate(offer);
            } catch (AllowedDecimalScaleException e) {
                fail("Offer is within allowed decimal scale.");
            }
        });
    }

    @Test
    @DisplayName("Offer includes a fractional part with a non-zero remainder")
    void makeAnOfferOnItem_offerRemainderIsNonZero_continueExecution() {
        final BigDecimal offer = new BigDecimal("50.51");

        assertThrows(FractionalDivisionIsNotZero.class, () -> validator.validate(offer));
    }

    @Test
    @DisplayName("Offer includes a fractional part divided by 10")
    void makeAnOfferOnItem_offerDividedByTenRemainderIsZero_continueExecution() {
        final BigDecimal offer = new BigDecimal("50.90");

        assertDoesNotThrow(() -> {
            try {
                validator.validate(offer);
            } catch (FractionalDivisionIsNotZero e) {
                fail("Remainder should be zero when divided by 10");
            }
        });
    }

    @Test
    @DisplayName("Offer includes a fractional part divided by 5")
    void makeAnOfferOnItem_offerDividedByFiveRemainderIsZero_continueExecution() {
        final BigDecimal offer = new BigDecimal("50.15");

        assertDoesNotThrow(() -> {
            try {
                validator.validate(offer);
            } catch (FractionalDivisionIsNotZero e) {
                fail("Five should be allowed");
            }
        });
    }
}