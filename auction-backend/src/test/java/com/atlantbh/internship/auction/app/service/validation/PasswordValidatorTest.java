package com.atlantbh.internship.auction.app.service.validation;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.service.validation.registration.PasswordValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;

class PasswordValidatorTest {

    PasswordValidator passwordValidator;

    @BeforeEach
    void setUp() {
        passwordValidator = new PasswordValidator();
    }

    @Test
    void testValidate_WhenThereAreInvalidSpecialCharacters_ShouldThrowValidationException() {
        final String input = "‡passworD123";

        assertThrows(ValidationException.class, () -> passwordValidator.validate(input));
    }

    @Test
    void testValidate_WhenThereAreWhiteSpaces_ShouldThrowValidationException() {
        final String input = "pass worD123";

        assertThrows(ValidationException.class, () -> passwordValidator.validate(input));
    }

    @Test
    void testValidate_WhenThereAreNoSpecialCharacters_ShouldThrowValidationException() {
        final String input = "password";

        assertThrows(ValidationException.class, () -> passwordValidator.validate(input));
    }

    @Test
    void testValidate_WhenThereAreNoNumbers_ShouldThrowValidationException() {
        final String input = "~password";

        assertThrows(ValidationException.class, () -> passwordValidator.validate(input));
    }

    @Test
    void testValidate_WhenThereAreNoUppercaseLetters_ShouldThrowValidationException() {
        final String input = "~passwo12rd";

        assertThrows(ValidationException.class, () -> passwordValidator.validate(input));
    }

    @Test
    void testValidate_WhenThereAreNoLowercaseLetters_ShouldThrowValidationException() {
        final String input = "~PASS12178";

        assertThrows(ValidationException.class, () -> passwordValidator.validate(input));
    }
}