package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.user.RegistrationRequest;

public interface RegistrationService {
    Boolean registerUser(final RegistrationRequest user);
}
