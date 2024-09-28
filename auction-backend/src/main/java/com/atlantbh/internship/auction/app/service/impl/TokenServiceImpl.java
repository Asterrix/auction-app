package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.config.TokenConfig;
import com.atlantbh.internship.auction.app.entity.Token;
import com.atlantbh.internship.auction.app.repository.TokenRepository;
import com.atlantbh.internship.auction.app.service.TokenService;
import com.atlantbh.internship.auction.app.service.provider.UserAuthentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Optional;

@Service
public class TokenServiceImpl implements TokenService {
    private final JwtEncoder jwtEncoder;
    private final TokenRepository tokenRepository;

    public TokenServiceImpl(final JwtEncoder jwtEncoder, final TokenRepository tokenRepository) {
        this.jwtEncoder = jwtEncoder;
        this.tokenRepository = tokenRepository;
    }

    private static String extractTokenFromBearer(final String bearerToken) {
        return bearerToken.substring(7); // Remove "Bearer "
    }

    private static boolean isExpired(final Instant currentTime, final Token token) {
        return token.getExpirationTime().isBefore(currentTime);
    }

    @Override
    public String generateToken(final UserAuthentication user) {
        final HashMap<String, Object> userClaims = user.getClaims();
        final Instant issuedAt = TokenConfig.issuedAt();
        final Instant expirationDate = TokenConfig.expirationDate(issuedAt);

        final JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(TokenConfig.ISSUER)
                .issuedAt(issuedAt)
                .expiresAt(expirationDate)
                .subject(user.getPrincipal().toString())
                .claims(claim -> claim.putAll(userClaims))
                .build();

        final String tokenValue = this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        saveTokenToDb(tokenValue, expirationDate);

        return tokenValue;
    }

    @Override
    public boolean isValid(final Instant currentTime, final String clientToken) {
        final Optional<Token> token = tokenRepository.findByToken(extractTokenFromBearer(clientToken));
        if (token.isEmpty() || isExpired(currentTime, token.get())) return false;

        return true;
    }

    private void saveTokenToDb(final String token, final Instant expirationDate) {
        tokenRepository.save(new Token(token, expirationDate));
    }

    @Override
    public void deleteToken(final String bearerToken) {
        tokenRepository.findByToken(extractTokenFromBearer(bearerToken)).ifPresent(tokenRepository::delete);
    }
}
