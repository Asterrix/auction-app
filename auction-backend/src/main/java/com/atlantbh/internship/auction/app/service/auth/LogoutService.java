package com.atlantbh.internship.auction.app.service.auth;

import com.atlantbh.internship.auction.app.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
public class LogoutService implements LogoutHandler {
    private final TokenService tokenService;

    public LogoutService(final TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    public void logout(final HttpServletRequest request, final HttpServletResponse response, final Authentication authentication) {
        final String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (token != null) {
            tokenService.deleteToken(token);
        }
    }
}
