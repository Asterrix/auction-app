package com.atlantbh.internship.auction.app.service.validation.bidding;

import com.atlantbh.internship.auction.app.exception.AllowedDecimalScaleException;
import com.atlantbh.internship.auction.app.exception.FractionalDivisionIsNotZero;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.model.utils.Validator;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class BiddingOfferValidator implements Validator<BigDecimal> {
    private static final byte ALLOWED_DECIMAL_SCALE = 2;

    // Ensures that the fractional part of the offer is a multiple of 5 or multiple of 10, preventing offers like $50.01 on an item priced at $50.00.
    // Offers with decimal places that can be rounded to a multiple of 5 or 10, like $50.10 or $50.15, will be considered valid.
    // Fractional / Mantissa (the numbers that come after decimal separator)
    private void validateFractionalPart(final BigDecimal number) {
        final int trailingZeros = number.stripTrailingZeros().scale();
        if (trailingZeros == 0) {
            return;
        }

        final String numberString = String.valueOf(number);
        final int decimalIndex = numberString.indexOf(".");
        final String decimalPart = numberString.substring(decimalIndex + 1);

        final int fractionalPart = Integer.parseInt(decimalPart);
        final int remainderOfFive = (fractionalPart * 2) % 5;
        final int remainderOfTen = fractionalPart % 10;

        if (remainderOfFive != 0 && remainderOfTen != 0) {
            throw new FractionalDivisionIsNotZero("Offer must be a multiple of 5 or 10.");
        }
    }

    private void validateDecimalScale(final BigDecimal number) {
        final int offerDecimalScale = number.scale();

        if (offerDecimalScale > ALLOWED_DECIMAL_SCALE) {
            throw new AllowedDecimalScaleException("Decimal precision must be limited to no more than two decimal places.");
        }
    }

    private void validateOfferIsNotNull(final BigDecimal offer) {
        if (offer == null) {
            throw new ValidationException("Bid request cannot be processed because the request doesn't contain numeric value.");
        }
    }

    @Override
    public void validate(final BigDecimal offer) {
        validateOfferIsNotNull(offer);
        validateDecimalScale(offer);
        validateFractionalPart(offer);
    }
}
