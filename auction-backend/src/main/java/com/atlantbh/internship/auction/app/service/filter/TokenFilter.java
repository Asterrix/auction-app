package com.atlantbh.internship.auction.app.service.filter;

import com.atlantbh.internship.auction.app.entity.Token;
import com.atlantbh.internship.auction.app.exception.token.TokenExpiredException;
import com.atlantbh.internship.auction.app.exception.token.TokenNotFoundException;
import com.atlantbh.internship.auction.app.service.TokenService;
import com.atlantbh.internship.auction.app.service.auth.LogoutService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Optional;

public class TokenFilter extends OncePerRequestFilter {
    private final TokenService tokenService;
    private final LogoutService logoutService;

    public TokenFilter(final TokenService tokenService, final LogoutService logoutService) {
        this.tokenService = tokenService;
        this.logoutService = logoutService;
    }

    @Override
    protected void doFilterInternal(final HttpServletRequest request,
                                    final HttpServletResponse response,
                                    final FilterChain filterChain) throws ServletException, IOException {

        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            try {
                final String headerToken = request.getHeader(HttpHeaders.AUTHORIZATION);

                // Validate token
                final Optional<Token> tokenInsideDb = tokenService.findToken(headerToken);
                if (tokenInsideDb.isEmpty()) {
                    this.logoutService.logout(request, response, authentication);
                    throw new TokenNotFoundException("Token could not be found inside the database.");
                }

                final Instant instant = Instant.now();
                final boolean tokenExpired = tokenService.hasExpired(instant, tokenInsideDb.get());
                if (tokenExpired) {
                    this.logoutService.logout(request, response, authentication);
                    throw new TokenExpiredException("Token has expired.");
                }

            } catch (TokenNotFoundException | TokenExpiredException e) {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.getWriter().write(e.getMessage());
                response.getWriter().flush();
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
