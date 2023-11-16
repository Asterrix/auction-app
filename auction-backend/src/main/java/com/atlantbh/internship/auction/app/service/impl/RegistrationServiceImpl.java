package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.builder.UserBuilder;
import com.atlantbh.internship.auction.app.dto.user.UserRegistrationDto;
import com.atlantbh.internship.auction.app.entity.Role;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.repository.RoleRepository;
import com.atlantbh.internship.auction.app.repository.UserRepository;
import com.atlantbh.internship.auction.app.service.RegistrationService;
import com.atlantbh.internship.auction.app.service.validator.user.UserRegistrationValidator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class RegistrationServiceImpl implements RegistrationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public RegistrationServiceImpl(final UserRepository userRepository,
                                   final RoleRepository roleRepository,
                                   final PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Boolean registerUser(final UserRegistrationDto user) {
        final Optional<Role> defaultRole = roleRepository.findByRoleAllIgnoreCase("user");
        if (defaultRole.isEmpty()) throw new NoSuchElementException();

        User entity = new UserBuilder()
                .setFirstName(user.firstName())
                .setLastName(user.lastName())
                .setEmail(user.email())
                .setPassword(passwordEncoder.encode(user.password()))
                .setRole(defaultRole.get())
                .setIsActive(true)
                .createUser();

        // Validation
        checkIfEmailIsInUse(entity.getEmail());
        UserRegistrationValidator.validate(entity);

        userRepository.save(entity);

        return true;
    }

    private void checkIfEmailIsInUse(final String email) {
        final long emailCount = userRepository.countByEmail(email);
        if (emailCount > 0) {
            throw new ValidationException("Email address is already in use. Try logging in.");
        }
    }
}
