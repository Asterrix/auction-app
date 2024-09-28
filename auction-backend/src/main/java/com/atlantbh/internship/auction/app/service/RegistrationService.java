package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.user.UserRegistrationDto;

public interface RegistrationService {
    String registerUser(final UserRegistrationDto user);
}
