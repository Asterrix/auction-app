package com.atlantbh.internship.auction.app.service.validator.user;

import com.atlantbh.internship.auction.app.dto.user.UserRegistrationDto;
import com.atlantbh.internship.auction.app.service.validator.Validator;

import static com.atlantbh.internship.auction.app.service.validator.user.FirstNameValidator.validateFirstName;
import static com.atlantbh.internship.auction.app.service.validator.user.LastNameValidator.validateLastName;

public class UserRegistrationValidator extends Validator {
    public static void validate(final UserRegistrationDto userDetails) {
        validateFirstName(userDetails.firstName());
        validateLastName(userDetails.lastName());
    }
}
