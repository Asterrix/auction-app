package com.atlantbh.internship.auction.app.service.validation.bidding;

import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class OwnerValidationTest {
    OwnerValidation ownerValidation;

    @BeforeEach
    void setUp() {
        ownerValidation = new OwnerValidator();
    }

    @Test
    @DisplayName("The user is attempting to bid on his own item")
    void testValidate_WhenBidderIsTheOwner_ThrowValidationException() {
        final User user = new User();

        final ValidationException validationException = assertThrows(
                ValidationException.class, () -> ownerValidation.validate(user, user));
        assertEquals("Users are not permitted to make offers on their own items.", validationException.getMessage());
    }
}