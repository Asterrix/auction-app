package com.atlantbh.internship.auction.app.service.validator.user;

import com.atlantbh.internship.auction.app.dto.user.UserRegistrationDto;

import static com.atlantbh.internship.auction.app.service.validator.user.EmailValidator.validateEmail;
import static com.atlantbh.internship.auction.app.service.validator.user.FirstNameValidator.validateFirstName;
import static com.atlantbh.internship.auction.app.service.validator.user.LastNameValidator.validateLastName;
import static com.atlantbh.internship.auction.app.service.validator.user.PasswordValidator.validatePassword;

public class UserRegistrationValidator {
    public static void validate(final UserRegistrationDto userDetails) {
        validateFirstName(userDetails.firstName());
        validateLastName(userDetails.lastName());
        validateEmail(userDetails.email());
        validatePassword(userDetails.password());
    }
}
