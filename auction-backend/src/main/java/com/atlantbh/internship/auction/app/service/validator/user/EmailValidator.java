package com.atlantbh.internship.auction.app.service.validator.user;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.service.validator.Validator;

import java.util.HashSet;
import java.util.Set;

public class EmailValidator extends Validator {
    private static final byte MINIMUM_EMAIL_LENGTH = 7;
    private static final byte MAXIMUM_EMAIL_LENGTH = 40;

    // .com, .net, .io
    private static final byte MINIMUM_DOMAIN_DOT_SEPARATOR_LENGTH = 2;
    private static final byte MAXIMUM_DOMAIN_DOT_SEPARATOR_LENGTH = 3;

    public static void validateEmail(final String email) {
        // Basic validation
        isEmptyOrNull(email, "Email field cannot be empty.");
        minimumLength(email, MINIMUM_EMAIL_LENGTH, String.format("Email field cannot contain less than %d characters.", MINIMUM_EMAIL_LENGTH));
        maximumLength(email, MAXIMUM_EMAIL_LENGTH, String.format("Email field cannot contain more than %d characters.", MAXIMUM_EMAIL_LENGTH));

        // Email specific validation
        int domainSeparatorIndex = validateCharacters(email);
        countLetters(email.substring(0, domainSeparatorIndex));
        validateDomain(email.substring(domainSeparatorIndex + 1));
    }

    private static int validateCharacters(final String email) {
        final int n = email.length();
        Set<Character> characters = new HashSet<>(n);
        int domainSeparatorIndex = 0;

        char[] charArray = email.toCharArray();
        for (int i = 0, charArrayLength = charArray.length; i < charArrayLength; i++) {
            final char c = charArray[i];

            if(c == ' ') throw new ValidationException("Invalid email address.");

            if (c == '.') {
                if (i == 0 || i == n - 1) {
                    throw new ValidationException("Invalid email address.");
                }

                if (i < charArray.length - 1) {
                    validateDuplicateCharacterPlacement(charArray, i, i + 1, c);
                }
                characters.add('.');
                continue;
            }

            if (c == '_') {
                if (i == 0 || i == n - 1) {
                    throw new ValidationException("Invalid email address.");
                }

                if (i < charArray.length - 1) {
                    validateDuplicateCharacterPlacement(charArray, i, i + 1, c);
                }
                continue;
            }

            if ((c == '@' && characters.contains(c)) || ((c == '@' && i == 0) || (c == '@' && i == n - 1))) {
                throw new ValidationException("Invalid email address.");
            } else if (c == '@') {
                characters.add(c);
                domainSeparatorIndex = i;
                continue;
            }

            if (!((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z'))) {
                throw new ValidationException("Only letters (a-z), numbers (0-9), and (.,_) are allowed.");
            }
        }

        if (!characters.contains('@')) throw new ValidationException("Invalid email address.");
        if (!characters.contains('.')) throw new ValidationException("Invalid email address.");

        return domainSeparatorIndex;
    }

    private static void validateDuplicateCharacterPlacement(final char[] input, final int trail, final int head, final char c) {
        if (input[trail] == c && input[head] == c) {
            throw new ValidationException("Invalid email address.");
        }
    }

    private static void countLetters(final String input) {
        byte countOfLetters = 0;
        for (final Character c : input.toCharArray()) {
            if (Character.isLetter(c)) {
                countOfLetters++;
            }
        }
        if (countOfLetters == 0) throw new ValidationException("Invalid email address.");
    }

    private static void validateDomain(final String domain) {
        countLetters(domain);
        int tldSeparatorIndex = validateTld(domain);
        countLetters(domain.substring(0, tldSeparatorIndex));
    }

    private static int validateTld(final String input) {
        byte countTillDot = 0;
        final int n = input.length();

        int p = n - 1;

        while (p >= 0 && input.charAt(p) != '.') {
            countTillDot++;
            if (countTillDot > MAXIMUM_DOMAIN_DOT_SEPARATOR_LENGTH) {
                throw new ValidationException("Invalid email address.");
            }
            p--;
        }

        if (countTillDot < MINIMUM_DOMAIN_DOT_SEPARATOR_LENGTH) {
            throw new ValidationException("Invalid email address.");
        }

        return p;
    }
}

