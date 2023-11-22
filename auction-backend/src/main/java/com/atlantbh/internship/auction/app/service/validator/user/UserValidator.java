package com.atlantbh.internship.auction.app.service.validator.user;

import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

import java.util.Set;

public class UserValidator {
    private static void validateEmail(final String email) {
        if (!EmailValidator.isValid(email)) {
            throw new ValidationException(EmailValidator.Message);
        }
    }

    private static void validatePassword(final String password) {
        if (!PasswordValidator.isValid(password)) {
            throw new ValidationException(PasswordValidator.Message);
        }
    }

    public static void isValid(final Validator validator, final User entity) {
        validateEntityConstraints(validator, entity);
        validateEmail(entity.getEmail());
        validatePassword(entity.getPassword());
    }

    private static void validateEntityConstraints(final Validator validator, final User entity) {
        Set<ConstraintViolation<User>> validate = validator.validate(entity);
        if (!validate.isEmpty()) {
            // Get the first validation error message
            String errorMessage = validate.iterator().next().getMessage();

            throw new ValidationException(errorMessage);
        }
    }
}
