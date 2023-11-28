package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.config.constant.TokenProperties;
import com.atlantbh.internship.auction.app.entity.Token;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.repository.TokenRepository;
import com.atlantbh.internship.auction.app.repository.UserRepository;
import com.atlantbh.internship.auction.app.service.TokenService;
import com.atlantbh.internship.auction.app.service.provider.UserAuthentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.TemporalUnit;
import java.util.HashMap;
import java.util.Optional;

@Service
public class TokenServiceImpl implements TokenService {
    private final TokenProperties tokenProperties;
    private final JwtEncoder jwtEncoder;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    public TokenServiceImpl(final TokenProperties tokenProperties,
                            final JwtEncoder jwtEncoder,
                            final TokenRepository tokenRepository,
                            final UserRepository userRepository) {
        this.tokenProperties = tokenProperties;
        this.jwtEncoder = jwtEncoder;
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
    }

    private static String extractTokenFromBearer(final String bearerToken) {
        return bearerToken.substring(7); // Remove "Bearer "
    }

    private Instant issueToken() {
        return Instant.now();
    }

    private Instant expirationDate(final Instant issuedAtTime, final Boolean rememberMe) {
        final TemporalUnit temporalUnit = tokenProperties.getTemporalUnit();

        if (rememberMe) {
            return issuedAtTime.plus(tokenProperties.getPersistentExpiration(), temporalUnit);
        }
        return issuedAtTime.plus(tokenProperties.getRegularExpiration(), temporalUnit);
    }

    @Override
    public String generateToken(final UserAuthentication user, final Boolean rememberMe) {
        final String userPrincipal = user.getPrincipal().toString();
        final User userToAssignToken = userRepository
                .findFirstByEmailAllIgnoreCase(userPrincipal)
                .orElseThrow(() -> new ValidationException(
                        "Token could not be assigned to the user because the user could not be found inside the database.")
                );

        deleteUserTokens(userPrincipal);

        final HashMap<String, Object> userClaims = user.getClaims();
        final Instant issuedAt = issueToken();
        final Instant expirationDate = expirationDate(issuedAt, rememberMe);

        final JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(tokenProperties.getIssuer())
                .issuedAt(issuedAt)
                .expiresAt(expirationDate)
                .subject(userPrincipal)
                .claims(claim -> claim.putAll(userClaims))
                .build();

        final String tokenValue = this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        saveTokenToDb(tokenValue, userToAssignToken, rememberMe, expirationDate);

        return tokenValue;
    }


    @Override
    public Optional<Token> findToken(final String token) {
        return tokenRepository.findByToken(extractTokenFromBearer(token));
    }

    @Override
    public boolean hasExpired(final Instant currentTime, final Token token) {
        return token.getExpirationTime().isBefore(currentTime);
    }

    private void saveTokenToDb(final String token, final User user, final Boolean persistent, final Instant expirationDate) {
        tokenRepository.save(new Token(token, user, persistent, expirationDate));
    }

    /**
     * Removes all tokens associated with the specified user.
     *
     * @param principal is typically defined as user's email
     */
    @Override
    public void deleteUserTokens(final String principal) {
        tokenRepository.deleteAll(tokenRepository.findAllUserTokens(principal));
    }

    /**
     * Removes specified token from the database.
     *
     * @param token obtained from the 'Authorization' header in HTTP request
     */
    @Override
    public void deleteToken(final String token) {
        findToken(token).ifPresent(tokenRepository::delete);
    }
}
