package com.atlantbh.internship.auction.app.service.validation.bidding;

import com.atlantbh.internship.auction.app.entity.User;

public interface OwnerValidation {
    void validate(User owner, User bidder);
}
