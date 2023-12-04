package com.atlantbh.internship.auction.app.service.validation.bidding;

import java.time.ZonedDateTime;

public interface TimeValidation {
    void validate(final ZonedDateTime timeOfRequest, final ZonedDateTime itemExpirationTime);
}
