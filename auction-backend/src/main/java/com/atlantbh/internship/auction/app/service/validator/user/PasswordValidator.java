package com.atlantbh.internship.auction.app.service.validator.user;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


/*
Criteria:
- Contains at least one uppercase letter (A-Z).
- Contains at least one lowercase letter (a-z).
- Contains at least one digit (0-9).
- Contains at least one special character (#$@!%&*?).
* */
public class PasswordValidator {
    public static final String Message = "Password must contain at least one lowercase and uppercase letter, one number and one special character.";

    public static boolean isValid(final String password) {
        var reg = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&*?])[A-Za-z\\d#$@!%&*?]+");

        Matcher matcher = reg.matcher(password);
        return matcher.find();
    }
}
