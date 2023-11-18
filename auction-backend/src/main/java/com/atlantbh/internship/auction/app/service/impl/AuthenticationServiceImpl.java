package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.user.AuthenticationRequest;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.repository.UserRepository;
import com.atlantbh.internship.auction.app.service.AuthenticationService;
import com.atlantbh.internship.auction.app.service.TokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;


    public AuthenticationServiceImpl(final UserRepository userRepository,
                                     final PasswordEncoder passwordEncoder,
                                     final TokenService tokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    public String authenticateUser(final AuthenticationRequest authenticationRequest) {
        // Default exception message
        final String message = "Check your credentials for potential mistakes and try again.";

        // Validate user exists
        Optional<User> user = userRepository.findFirstByEmailAllIgnoreCase(authenticationRequest.username());
        if (user.isEmpty()) {
            throw new ValidationException(message);
        }

        // Validate password
        final boolean matches = passwordEncoder.matches(authenticationRequest.password(), user.get().getPassword());
        if (!matches) {
            throw new ValidationException(message);
        }

        return tokenService.generateToken(user.get());
    }
}
