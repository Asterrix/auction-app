package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.user.RegistrationRequest;
import com.atlantbh.internship.auction.app.entity.Role;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.repository.RoleRepository;
import com.atlantbh.internship.auction.app.repository.UserRepository;
import com.atlantbh.internship.auction.app.service.RegistrationService;
import com.atlantbh.internship.auction.app.service.validator.MainValidationClass;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class RegistrationServiceImpl implements RegistrationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final MainValidationClass<RegistrationRequest> registerValidator;

    public RegistrationServiceImpl(final UserRepository userRepository,
                                   final RoleRepository roleRepository,
                                   final PasswordEncoder passwordEncoder,
                                   final MainValidationClass<RegistrationRequest> registerValidator) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.registerValidator = registerValidator;
    }

    private static User createUserEntity(final RegistrationRequest user, final Role defaultRole) {
        return new User(
                user.firstName().replaceAll("\\s+", " ").trim(),
                user.lastName().replaceAll("\\s+", " ").trim(),
                user.email(),
                user.password(),
                defaultRole,
                true);
    }

    @Override
    public void registerUser(final RegistrationRequest user) {
        registerValidator.validate(user);
        checkIfEmailIsInUse(user.email());

        final Role defaultRole = getDefaultRole();
        final User entity = createUserEntity(user, defaultRole);

        encodePassword(entity);
        userRepository.save(entity);
    }

    private Role getDefaultRole() {
        return roleRepository
                .findByRoleAllIgnoreCase("User")
                .orElseThrow(() -> new NoSuchElementException("The default role for user could not be found in the database."));
    }

    private void encodePassword(final User entity) {
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
    }

    private void checkIfEmailIsInUse(final String email) {
        final long emailCount = userRepository.countByEmailAllIgnoreCase(email);
        if (emailCount > 0) {
            throw new ValidationException("The email address is already in use. Try logging in.");
        }
    }
}
