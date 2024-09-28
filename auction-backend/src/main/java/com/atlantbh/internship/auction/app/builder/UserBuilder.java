package com.atlantbh.internship.auction.app.builder;

import com.atlantbh.internship.auction.app.entity.Role;
import com.atlantbh.internship.auction.app.entity.User;

public class UserBuilder {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
    private Boolean isActive;

    public UserBuilder setFirstName(final String firstName) {
        this.firstName = firstName.replaceAll("\\s+", " ").trim();
        return this;
    }

    public UserBuilder setLastName(final String lastName) {
        this.lastName = lastName.replaceAll("\\s+", " ").trim();
        return this;
    }

    public UserBuilder setEmail(final String email) {
        this.email = email.replaceAll("\\s+", " ").trim();
        return this;
    }

    public UserBuilder setPassword(final String password) {
        this.password = password.trim();
        return this;
    }

    public UserBuilder setRole(final Role role) {
        this.role = role;
        return this;
    }

    public UserBuilder setIsActive(final Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public User createUser() {
        return new User(firstName, lastName, email, password, role, isActive);
    }
}