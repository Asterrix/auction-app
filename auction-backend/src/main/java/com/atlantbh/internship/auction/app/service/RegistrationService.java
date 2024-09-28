package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.user.RegistrationRequest;
import com.atlantbh.internship.auction.app.entity.User;

public interface RegistrationService {
    User registerUser(final RegistrationRequest user);
}
