package com.atlantbh.internship.auction.app.service.filter;

import com.atlantbh.internship.auction.app.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;

public class TokenFilter extends OncePerRequestFilter {
    private final TokenService tokenService;

    public TokenFilter(final TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(final HttpServletRequest request,
                                    final HttpServletResponse response,
                                    final FilterChain filterChain) throws ServletException, IOException {

        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            try {
                // Validate that token is present in the header
                final String token = request.getHeader("Authorization");
                if (token == null || token.isEmpty()) throw new Exception();

                // Validate token
                final Instant instant = Instant.now();
                final boolean valid = tokenService.isValid(instant, token);
                if (!valid) throw new Exception();
            } catch (Exception e) {
                response.setStatus(HttpStatus.BAD_REQUEST.value());
                response.getWriter().write("Invalid Token!");
                response.getWriter().flush();
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
