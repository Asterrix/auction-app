package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.entity.Token;
import com.atlantbh.internship.auction.app.repository.TokenRepository;
import com.atlantbh.internship.auction.app.service.TokenService;
import com.atlantbh.internship.auction.app.service.provider.UserAuthentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;

@Service
public class TokenServiceImpl implements TokenService {
    public static final String ISSUER = "Auction Application";
    private final JwtEncoder jwtEncoder;
    private final TokenRepository tokenRepository;

    public TokenServiceImpl(final JwtEncoder jwtEncoder, final TokenRepository tokenRepository) {
        this.jwtEncoder = jwtEncoder;
        this.tokenRepository = tokenRepository;
    }

    @Override
    public String generateToken(final UserAuthentication user) {
        final Instant now = Instant.now();
        final Instant expiresAt = now.plus(7, ChronoUnit.DAYS);
        final HashMap<String, Object> userClaims = user.getClaims();

        final JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .issuedAt(now)
                .expiresAt(expiresAt)
                .subject(user.getPrincipal().toString())
                .claims(claim -> claim.putAll(userClaims))
                .build();

        final String tokenValue = this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        saveTokenToDb(tokenValue, expiresAt);

        return tokenValue;
    }

    private void saveTokenToDb(final String token, final Instant expirationDate) {
        tokenRepository.save(new Token(token, expirationDate));
    }
}
