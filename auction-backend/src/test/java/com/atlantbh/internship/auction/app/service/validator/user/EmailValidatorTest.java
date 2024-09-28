package com.atlantbh.internship.auction.app.service.validator.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class EmailValidatorTest {

    @Test
    void isValid_ShouldReturnTrue_WhenThereAreMultipleAtSigns() {
        final String input = "te@st@er";

        Assertions.assertFalse(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenThereIsNoDomainSeparator() {
        final String input = "inputTe.st";

        Assertions.assertFalse(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenAtSignIsFirstCharacter() {
        final String input = "@inputTe.st";

        Assertions.assertFalse(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenAtSignIsLastCharacter() {
        final String input = "inputTe.st@";

        Assertions.assertFalse(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenThereIsNoDotFound() {
        final String input = "input@Test";

        Assertions.assertFalse(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenDotIsFirstCharacter() {
        final String input = ".te@ster";

        Assertions.assertFalse(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenDotIsLastCharacter() {
        final String input = "test@er.";

        Assertions.assertFalse(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenThereAreSpecialCharacters() {
        final String input = "~test#er";

        Assertions.assertFalse(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenThereAreMultipleDotsNextToEachOther() {
        final String input = "te@ster..";

        Assertions.assertFalse(EmailValidator.isValid(input));
    }

    @Test
    void countLetters_ShouldReturnTrue_WhenThereAreZeroLetters() {
        final String input = "123@456";

        Assertions.assertFalse(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenDomainDoesntContainDot() {
        final String input = "test.e@r";

        Assertions.assertFalse(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenDomainTldIsMinimumAllowedLength() {
        final String input = "test.e@r.cm";

        Assertions.assertTrue(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenDomainTldIsMaximumAllowedLength() {
        final String input = "test.e@r.com";

        Assertions.assertTrue(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenDomainDoesntContainAnyLettersBeforeTld() {
        final String input = "test.e@.com";

        Assertions.assertFalse(EmailValidator.isValid(input));
    }

    @Test
    void isValid_ShouldReturnTrue_WhenDomainContainsLettersBeforeTld() {
        final String input = "test.e@e.com";

        Assertions.assertTrue(EmailValidator.isValid(input));
    }
}