package com.atlantbh.internship.auction.app.service.validator.user;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.service.validator.Validator;

public class PasswordValidator extends Validator {
    private static final Integer MIN_PASSWORD_LENGTH = 8;
    private static final Integer MAX_PASSWORD_LENGTH = 100;

    public static void validatePassword(final String input) {
        final String password = normaliseInput(input);

        isEmptyOrNull(password, "Password field cannot be null");
        minimumLength(password, MIN_PASSWORD_LENGTH, String.format("Password cannot contain less than %d characters.", MIN_PASSWORD_LENGTH));
        maximumLength(password, MAX_PASSWORD_LENGTH, String.format("Password cannot contain more than %d characters.", MAX_PASSWORD_LENGTH));
        countCharacters(password);
    }

    private static void countCharacters(final String password) {
        final int n = password.length();

        byte specialCharacters = 0;
        byte numbers = 0;
        byte upperCaseLetters = 0;
        byte lowerCaseLetters = 0;

        char[] charArray = password.toCharArray();
        for (int i = 0; i < n; i++) {
            final char c = charArray[i];

            // 33: ASCII key of (!)
            // 126: ASCII key of (~)
            if (c < 32 || c > 127) {
                throw new ValidationException("Invalid special characters.");
            }

            if (c >= '!' && c <= '/' || c >= '[' && c <= '`' || c >= '{' && c <= '~') {
                specialCharacters++;
            } else if (c >= '0' && c <= '9') {
                numbers++;
            } else if (c >= 'A' && c <= 'Z') {
                upperCaseLetters++;
            } else if (c >= 'a' && c <= 'z') {
                lowerCaseLetters++;
            } else {
                throw new ValidationException(
                        "Password must contain at least one special character ($, @, ~, etc.).\n" +
                                "Includes at least one lowercase and one uppercase letter.\n" +
                                "Contain at least one number.\n" +
                                "Cannot contain any spaces.");
            }
        }

        if (specialCharacters == 0 || numbers == 0 || upperCaseLetters == 0 || lowerCaseLetters == 0) {
            throw new ValidationException(
                    "Password must contain at least one special character ($, @, ~, etc.).\n" +
                            "Includes at least one lowercase and one uppercase letter.\n" +
                            "Contain at least one number.\n" +
                            "Cannot contain any empty spaces.");
        }
    }
}
