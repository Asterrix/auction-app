package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.service.provider.UserAuthentication;

public interface TokenService {
    String generateToken(final UserAuthentication user);
}
