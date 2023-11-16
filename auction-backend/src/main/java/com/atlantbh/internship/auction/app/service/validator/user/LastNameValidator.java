package com.atlantbh.internship.auction.app.service.validator.user;

import com.atlantbh.internship.auction.app.service.validator.Validator;

public class LastNameValidator extends Validator {
    private static final Integer MIN_LAST_NAME_LENGTH = 3;
    private static final Integer MAX_LAST_NAME_LENGTH = 30;

    public static void validateLastName(final String input) {
        final String lastName = normaliseInput(input);

        isEmptyOrNull(lastName, "Last name field cannot be empty.");
        minimumLength(lastName, MIN_LAST_NAME_LENGTH, String.format("Last name cannot contain less than %d characters", MIN_LAST_NAME_LENGTH));
        maximumLength(lastName, MAX_LAST_NAME_LENGTH, String.format("Last name cannot contain more than %d characters", MAX_LAST_NAME_LENGTH));
        isMadeUpOfLetters(lastName, "The last name must consist exclusively of letters.");
    }
}
