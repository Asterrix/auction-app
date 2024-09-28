package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.user.AuthenticationRequest;

public interface AuthenticationService {
    String authenticateUser(final AuthenticationRequest authenticationRequest);
}
