package com.atlantbh.internship.auction.app.service.validator.user;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class PasswordValidatorTest {

    @Test
    void validatePassword_ShouldThrow_WhenThereAreInvalidSpecialCharacters() {
        final String input = "‡passworD123";

        Assertions.assertThrows(ValidationException.class, () -> PasswordValidator.validatePassword(input));
    }

    @Test
    void validatePassword_ShouldThrow_WhenThereAreWhiteSpaces() {
        final String input = "pass worD123";

        Assertions.assertThrows(ValidationException.class, () -> PasswordValidator.validatePassword(input));
    }

    @Test
    void validatePassword_ShouldThrow_WhenThereAreNoSpecialCharacters() {
        final String input = "password";

        Assertions.assertThrows(ValidationException.class, () -> PasswordValidator.validatePassword(input));
    }

    @Test
    void validatePassword_ShouldThrow_WhenThereAreNoNumbers() {
        final String input = "~password";

        Assertions.assertThrows(ValidationException.class, () -> PasswordValidator.validatePassword(input));
    }

    @Test
    void validatePassword_ShouldThrow_WhenThereAreNoUppercaseLetters() {
        final String input = "~passwo12rd";

        Assertions.assertThrows(ValidationException.class, () -> PasswordValidator.validatePassword(input));
    }

    @Test
    void validatePassword_ShouldThrow_WhenThereAreNoLowercaseLetters() {
        final String input = "~PASS12178";

        Assertions.assertThrows(ValidationException.class, () -> PasswordValidator.validatePassword(input));
    }
}