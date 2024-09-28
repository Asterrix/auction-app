package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.user.UserRegistrationDto;
import com.atlantbh.internship.auction.app.entity.Role;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.repository.RoleRepository;
import com.atlantbh.internship.auction.app.repository.UserRepository;
import com.atlantbh.internship.auction.app.service.RegistrationService;
import com.atlantbh.internship.auction.app.service.validator.user.UserValidator;
import jakarta.validation.Validator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class RegistrationServiceImpl implements RegistrationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final Validator validator;

    public RegistrationServiceImpl(final UserRepository userRepository,
                                   final RoleRepository roleRepository,
                                   final PasswordEncoder passwordEncoder,
                                   final Validator validator) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.validator = validator;
    }

    @Override
    public Boolean registerUser(final UserRegistrationDto user) {
        final Optional<Role> defaultRole = roleRepository.findByRoleAllIgnoreCase("user");
        if (defaultRole.isEmpty()) throw new NoSuchElementException();

        User entity = new User(
                user.firstName().replaceAll("\\s+", " ").trim(),
                user.lastName().replaceAll("\\s+", " ").trim(),
                user.email(),
                user.password(),
                defaultRole.get(),
                true);

        // Will throw
        validateUser(entity);

        encodePassword(user, entity);
        userRepository.save(entity);

        return true;
    }

    private void validateUser(final User entity) {
        checkIfEmailIsInUse(entity.getEmail());
        UserValidator.isValid(validator, entity);
    }

    private void encodePassword(final UserRegistrationDto user, final User entity) {
        entity.setPassword(passwordEncoder.encode(user.password()));
    }

    private void checkIfEmailIsInUse(final String email) {
        final long emailCount = userRepository.countByEmailAllIgnoreCase(email);
        if (emailCount > 0) {
            throw new ValidationException("Email address is already in use. Try logging in.");
        }
    }
}
