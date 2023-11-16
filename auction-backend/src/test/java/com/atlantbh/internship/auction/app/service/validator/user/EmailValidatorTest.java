package com.atlantbh.internship.auction.app.service.validator.user;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class EmailValidatorTest {

    @Test
    void validateCharacters_ShouldThrow_WhenThereAreMultipleAtSigns() {
        final String input = "te@st@er";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateCharacters_ShouldThrow_WhenThereIsNoDomainSeparator() {
        final String input = "inputTe.st";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateCharacters_ShouldThrow_WhenAtSignIsFirstCharacter() {
        final String input = "@inputTe.st";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateCharacters_ShouldThrow_WhenAtSignIsLastCharacter() {
        final String input = "inputTe.st@";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateCharacters_ShouldThrow_WhenThereIsNoDotFound() {
        final String input = "input@Test";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateCharacters_ShouldThrow_WhenDotIsFirstCharacter() {
        final String input = ".te@ster";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateCharacters_ShouldThrow_WhenDotIsLastCharacter() {
        final String input = "test@er.";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateCharacters_ShouldThrow_WhenThereAreSpecialCharacters() {
        final String input = "~test#er";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateCharacters_ShouldThrow_WhenThereAreMultipleDotsNextToEachOther() {
        final String input = "te@ster..";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void countLetters_ShouldThrow_WhenThereAreZeroLetters() {
        final String input = "123@456";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateDomain_ShouldThrow_WhenDomainDoesntContainDot() {
        final String input = "test.e@r";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateTld_ShouldThrow_WhenDomainTldIsLongerThanAllowed() {
        final String input = "test.e@r.comm";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateTld_ShouldThrow_WhenDomainTldIsShorterThanAllowed() {
        final String input = "test.e@r.c";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateTld_ShouldDoNothing_WhenDomainTldIsMinimumAllowedLength() {
        final String input = "test.e@r.cm";

        Assertions.assertDoesNotThrow(() -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateTld_ShouldDoNothing_WhenDomainTldIsMaximumAllowedLength() {
        final String input = "test.e@r.com";

        Assertions.assertDoesNotThrow(() -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateDomain_ShouldThrow_WhenDomainDoesntContainAnyLettersBeforeTld() {
        final String input = "test.e@.com";

        Assertions.assertThrows(ValidationException.class, () -> EmailValidator.validateEmail(input));
    }

    @Test
    void validateDomain_ShouldDoNothing_WhenDomainContainsLettersBeforeTld() {
        final String input = "test.e@e.com";

        Assertions.assertDoesNotThrow(() -> EmailValidator.validateEmail(input));
    }
}