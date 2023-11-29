package com.atlantbh.internship.auction.app.service.validation.bidding;

import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import org.springframework.stereotype.Component;

@Component
public class OwnerValidator implements OwnerValidation {
    @Override
    public void validate(final User owner, final User bidder) {
        if (owner.equals(bidder)) {
            throw new ValidationException("Users are not permitted to make offers on their own items.");
        }
    }
}
