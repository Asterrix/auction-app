package com.atlantbh.internship.auction.app.exception;


/**
 * Exception thrown when an item offer contains a decimal number with a decimal scale that is larger than allowed.
 *
 * <p>
 * For example, if the maximum allowed decimal scale is 2, and the item offer includes a decimal number with a scale of 3
 * (e.g., 123.456), this exception will be thrown to indicate the violation of the allowed scale constraint.
 * </p>
 */
public class AllowedDecimalScaleException extends ValidationException {
    public AllowedDecimalScaleException(final String message) {
        super(message);
    }
}
