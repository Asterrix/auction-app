package com.atlantbh.internship.auction.app.dto.user;

import com.atlantbh.internship.auction.app.entity.User;

import java.io.Serializable;

/**
 * DTO for {@link User}
 */
public record UserRegistrationDto(
        String firstName,
        String lastName,
        String email,
        String password
) implements Serializable {
}