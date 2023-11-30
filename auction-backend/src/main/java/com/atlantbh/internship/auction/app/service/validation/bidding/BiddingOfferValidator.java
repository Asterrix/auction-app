package com.atlantbh.internship.auction.app.service.validation.bidding;

import com.atlantbh.internship.auction.app.exception.AllowedDecimalScaleException;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.model.utils.Validator;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class BiddingOfferValidator implements Validator<BigDecimal> {
    private static final byte ALLOWED_DECIMAL_SCALE = 2;

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
    }
}
