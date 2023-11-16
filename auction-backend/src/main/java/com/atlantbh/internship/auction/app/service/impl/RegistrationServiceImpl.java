package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.user.UserRegistrationDto;
import com.atlantbh.internship.auction.app.entity.Role;
import com.atlantbh.internship.auction.app.entity.User;
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
    public String registerUser(final UserRegistrationDto user) {
        final Optional<Role> defaultRole = roleRepository.findByRoleAllIgnoreCase("user");
        if (defaultRole.isEmpty()) throw new NoSuchElementException();

        User entity = new User(user.firstName(),
                user.lastName(),
                user.email(),
                passwordEncoder.encode(user.password()),
                defaultRole.get(),
                true);

        UserRegistrationValidator.validate(user);

        userRepository.save(entity);

        return "User was created successfully";
    }
}
