package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.service.provider.UserAuthentication;

import java.time.Instant;

public interface TokenService {
    String generateToken(final UserAuthentication user, final Boolean rememberMe);

    boolean isValid(final Instant currentTime, final String token);

    void deleteTokenUponLogout(final String bearerToken);
}
