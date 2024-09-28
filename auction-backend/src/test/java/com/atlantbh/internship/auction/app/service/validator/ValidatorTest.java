package com.atlantbh.internship.auction.app.service.validator;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ValidatorTest {

//    getAllCategories_ShouldReturnListOfCategories

    @Test
    void isEmptyOrNull_ShouldThrowException_WhenInputIsNull() {
        assertThrows(ValidationException.class, () -> Validator.isEmptyOrNull(null, null));
    }

    @Test
    void isEmptyOrNull_ShouldThrowException_WhenInputIsEmpty() {
        assertThrows(ValidationException.class, () -> Validator.isEmptyOrNull("", null));
    }

    @Test
    void isEmptyOrNull_ShouldDoNothing_WhenInputIsValid() {
        assertDoesNotThrow(() -> Validator.isEmptyOrNull("T", null));
    }

    @Test
    void minimumLength_ShouldThrow_WhenInputIsNull() {
        assertThrows(ValidationException.class, () -> Validator.minimumLength(null, 1, null));
    }

    @Test
    void minimumLength_ShouldThrow_WhenInputIsLessThan_MinimumLength() {
        assertThrows(ValidationException.class, () -> Validator.minimumLength("x", 2, null));
    }

    @Test
    void minimumLength_ShouldDoNothing_WhenInputIsValid() {
        assertDoesNotThrow(() -> Validator.minimumLength("YYY", 3, null));
    }


    @Test
    void maximumLength_ShouldThrow_WhenInputIsNull() {
        assertThrows(ValidationException.class, () -> Validator.maximumLength(null, 10, null));
    }

    @Test
    void maximumLength_ShouldThrow_WhenInputIsGreaterThan_MaximumLength() {
        assertThrows(ValidationException.class, () -> Validator.maximumLength("Otorhinolaryngology", 12, null));
    }

    @Test
    void maximumLength_ShouldDoNothing_WhenInputIsValid() {
        assertDoesNotThrow(() -> Validator.maximumLength("Chaubunagungamaug", 32, null));
    }

    @Test
    void isMadeUpOfLetters_ShouldThrow_WhenInputIsNull() {
        assertThrows(ValidationException.class, () -> Validator.isMadeUpOfLetters(null, null));
    }

    @Test
    void isMadeUpOfLetters_ShouldThrow_WhenInputContainsNumbers() {
        final String input = "3";

        assertThrows(ValidationException.class, () -> Validator.isMadeUpOfLetters(input, null));
    }

    @Test
    void isMadeUpOfLetters_ShouldThrow_WhenInputContainsSpecialCharacters() {
        final String input = "@";

        assertThrows(ValidationException.class, () -> Validator.isMadeUpOfLetters(input, null));
    }

    @Test
    void isMadeUpOfLetters_ShouldDoNothing_WhenInputIsWhiteSpace() {
        final String input = " ";

        assertDoesNotThrow(() -> Validator.isMadeUpOfLetters(input, null));
    }
}