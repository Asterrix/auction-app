package com.atlantbh.internship.auction.app.service.validation;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.model.utils.Validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


/*
Criteria:
- Contains at least one uppercase letter (A-Z).
- Contains at least one lowercase letter (a-z).
- Contains at least one digit (0-9).
- Contains at least one special character (#$@!%&*?).
* */
public class PasswordValidator implements Validator<String> {
    public static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&*?])[A-Za-z\\d#$@!%&*?]+";

    @Override
    public void validate(final String password) {
        final Pattern reg = Pattern.compile(PASSWORD_REGEX);

        final Matcher matcher = reg.matcher(password);
        if (!matcher.find()) {
            throw new ValidationException("Password must contain at least one lowercase and uppercase letter, one number and one special character.");
        }
    }
}
