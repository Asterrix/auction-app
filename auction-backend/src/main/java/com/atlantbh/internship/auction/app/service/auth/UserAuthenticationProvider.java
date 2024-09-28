package com.atlantbh.internship.auction.app.service.auth;

import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserAuthenticationProvider implements AuthenticationProvider {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserAuthenticationProvider(final UserRepository userRepository, final PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(final Authentication authentication) throws AuthenticationException {
        // Default exception message
        final String message = "Check your credentials for potential mistakes and try again.";

        // Validate user exists
        Optional<User> user = userRepository.findFirstByEmailAllIgnoreCase(authentication.getName());
        if (user.isEmpty()) throw new ValidationException(message);

        // Validate password
        final String rawPassword = authentication.getCredentials().toString();
        final String encodedPassword = user.get().getPassword();
        final boolean matches = passwordEncoder.matches(rawPassword, encodedPassword);
        if (!matches) throw new ValidationException(message);

        return UserAuthentication.authenticated(user.get());
    }

    @Override
    public boolean supports(final Class<?> authentication) {
        return UserAuthentication.class.isAssignableFrom(authentication);
    }
}
