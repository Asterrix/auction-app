package com.atlantbh.internship.auction.app.service.validator.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class PasswordValidatorTest {

    @Test
    void isValid_ShouldReturnFalse_WhenThereAreInvalidSpecialCharacters() {
        final String input = "‡passworD123";

        Assertions.assertFalse(PasswordValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnFalse_WhenThereAreWhiteSpaces() {
        final String input = "pass worD123";

        Assertions.assertFalse(PasswordValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnFalse_WhenThereAreNoSpecialCharacters() {
        final String input = "password";

        Assertions.assertFalse(PasswordValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnFalse_WhenThereAreNoNumbers() {
        final String input = "~password";

        Assertions.assertFalse(PasswordValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnFalse_WhenThereAreNoUppercaseLetters() {
        final String input = "~passwo12rd";

        Assertions.assertFalse(PasswordValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnFalse_WhenThereAreNoLowercaseLetters() {
        final String input = "~PASS12178";

        Assertions.assertFalse(PasswordValidator.isValid(input));
    }
}