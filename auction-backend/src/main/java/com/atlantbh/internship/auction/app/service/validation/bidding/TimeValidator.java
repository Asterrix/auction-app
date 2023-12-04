package com.atlantbh.internship.auction.app.service.validation.bidding;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class TimeValidator implements TimeValidation {
    @Override
    public void validate(final LocalDateTime timeOfRequest, final LocalDateTime itemExpirationTime) {
        if (timeOfRequest.isAfter(itemExpirationTime)) {
            throw new ValidationException("This auction has finished. Better luck next time.");
        }
    }
}
