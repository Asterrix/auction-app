package com.atlantbh.internship.auction.app.service.validator.user;

import com.atlantbh.internship.auction.app.service.validator.Validator;

public class FirstNameValidator extends Validator {
    private static final Integer MIN_FIRST_NAME_LENGTH = 3;
    private static final Integer MAX_FIRST_NAME_LENGTH = 20;

    public static void validateFirstName(final String firstName) {
        isEmptyOrNull(firstName, "First name field cannot be empty.");
        minimumLength(firstName, MIN_FIRST_NAME_LENGTH, String.format("First name cannot contain less than %d characters", MIN_FIRST_NAME_LENGTH));
        maximumLength(firstName, MAX_FIRST_NAME_LENGTH, String.format("First name cannot contain more than %d characters", MAX_FIRST_NAME_LENGTH));
        isMadeUpOfLetters(firstName, "The first name must consist exclusively of letters.");
    }
}
