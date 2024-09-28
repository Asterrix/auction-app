package com.atlantbh.internship.auction.app.dto.user;

public record AuthenticationRequest(String email, String password, Boolean rememberMe) {
}
