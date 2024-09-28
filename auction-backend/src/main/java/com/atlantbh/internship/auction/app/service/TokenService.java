package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.entity.User;

public interface TokenService {
    String generateToken(final User user);
}
