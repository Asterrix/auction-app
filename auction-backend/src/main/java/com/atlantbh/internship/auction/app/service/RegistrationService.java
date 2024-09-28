package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.user.RegistrationRequest;

public interface RegistrationService {
    void registerUser(final RegistrationRequest user);
}
