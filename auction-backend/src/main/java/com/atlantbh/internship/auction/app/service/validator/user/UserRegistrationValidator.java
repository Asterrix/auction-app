package com.atlantbh.internship.auction.app.service.validator.user;

import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;

import static com.atlantbh.internship.auction.app.service.validator.user.EmailValidator.validateEmail;
import static com.atlantbh.internship.auction.app.service.validator.user.FirstNameValidator.validateFirstName;
import static com.atlantbh.internship.auction.app.service.validator.user.LastNameValidator.validateLastName;
import static com.atlantbh.internship.auction.app.service.validator.user.PasswordValidator.validatePassword;

public class UserRegistrationValidator {
    /**
     * Validates the user properties.
     *
     * @param user The user entity to validate.
     * @throws ValidationException if validation fails.
     */
    public static void validate(final User user) {
        validateFirstName(user.getFirstName());
        validateLastName(user.getLastName());
        validateEmail(user.getEmail());
        validatePassword(user.getPassword());
    }
}
