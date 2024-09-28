package com.atlantbh.internship.auction.app.service.validation.bidding;

import java.time.LocalDateTime;

public interface TimeValidation {
    void validate(final LocalDateTime timeOfRequest, final LocalDateTime itemExpirationTime);
}
