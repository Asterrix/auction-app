package com.atlantbh.internship.auction.app.config.claims;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

@Configuration
public class UserClaimsExtractor implements ClaimsExtractor {
    @Override
    public Integer getUserId() {
        final long id = (long) extractClaimsFromToken().getClaims().get("id");
        return (int) id;
    }

    private Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    private Jwt extractClaimsFromToken() {
        return (Jwt) getAuthentication().getCredentials();
    }
}
