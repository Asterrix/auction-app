package com.atlantbh.internship.auction.app.service.validator;

import com.atlantbh.internship.auction.app.exception.ValidationException;


public class Validator {
    protected static void isEmptyOrNull(final String input, final String message) {
        if (input == null || input.isEmpty()) {
            throw new ValidationException(message);
        }
    }

    protected static void minimumLength(final String input, final int minimumLength, final String message) {
        if (input == null || input.length() < minimumLength) {
            throw new ValidationException(message);
        }
    }

    protected static void maximumLength(final String input, final int maximumLength, final String message) {
        if (input == null || input.length() > maximumLength) {
            throw new ValidationException(message);
        }
    }

    protected static void isMadeUpOfLetters(final String input, final String message) {
        if (input == null) throw new ValidationException(message);
        final int n = input.length();

        for (int i = 0; i < n; i++) {
            if (input.charAt(i) == ' ') {
                continue;
            } else if (!Character.isLetter(input.charAt(i))) {
                throw new ValidationException(message);
            }
        }
    }
}
