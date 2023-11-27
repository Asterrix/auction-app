package com.atlantbh.internship.auction.app.service.validator.user;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class EmailValidatorTest {
    EmailValidator emailValidator;

    @BeforeEach
    void setUp() {
        emailValidator = new EmailValidator();
    }

    @Test
    void testValidate_WhenThereAreMultipleAtSigns_ShouldThrowValidationException() {
        final String input = "te@st@er";

        assertThrows(ValidationException.class, () -> emailValidator.validate(input));
    }

    @Test
    void testValidate_WhenThereIsNoDomainSeparator_ShouldThrowValidationException() {
        final String input = "inputTe.st";

        assertThrows(ValidationException.class, () -> emailValidator.validate(input));
    }

    @Test
    void testValidate_WhenAtSignIsFirstCharacter_ShouldThrowValidationException() {
        final String input = "@inputTe.st";

        assertThrows(ValidationException.class, () -> emailValidator.validate(input));
    }

    @Test
    void testValidate_WhenAtSignIsLastCharacter_ShouldThrowValidationException() {
        final String input = "inputTe.st@";

        assertThrows(ValidationException.class, () -> emailValidator.validate(input));
    }

    @Test
    void testValidate_WhenThereIsNoDotFound_ShouldValidationThrowException() {
        final String input = "input@Test";

        assertThrows(ValidationException.class, () -> emailValidator.validate(input));
    }

    @Test
    void testValidate_WhenDotIsFirstCharacter_ShouldThrowValidationException() {
        final String input = ".te@ster";

        assertThrows(ValidationException.class, () -> emailValidator.validate(input));
    }

    @Test
    void testValidate_WhenDotIsLastCharacter_ShouldThrowValidationException() {
        final String input = "test@er.";

        assertThrows(ValidationException.class, () -> emailValidator.validate(input));
    }

    @Test
    void testValidate_WhenThereAreInvalidSpecialCharacters_ShouldThrowValidationException() {
        final String input = "~test#er";

        assertThrows(ValidationException.class, () -> emailValidator.validate(input));
    }

    @Test
    void testValidate_WhenThereAreMultipleDotsNextToEachOther_ShouldThrowValidationException() {
        final String input = "te@ster..";

        assertThrows(ValidationException.class, () -> emailValidator.validate(input));
    }

    @Test
    void testValidate_WhenThereAreZeroLetters_ShouldThrowValidationException() {
        final String input = "123@456";

        assertThrows(ValidationException.class, () -> emailValidator.validate(input));
    }

    @Test
    void testValidate_WhenDomainDoesNotContainDot_ShouldThrowValidationException() {
        final String input = "tester";

        assertThrows(ValidationException.class, () -> emailValidator.validate(input));
    }

    @Test
    void testValidate_WhenDomainDoesntContainAnyLettersBeforeTld_ShouldThrowValidationException() {
        final String input = "test.e@.com";

        assertThrows(ValidationException.class, () -> emailValidator.validate(input));
    }

    @Test
    void testValidate_WhenDomainContainsLettersBeforeTld_ShouldPass() {
        final String input = "test.e@e.com";

        assertDoesNotThrow(() -> emailValidator.validate(input));
    }
}