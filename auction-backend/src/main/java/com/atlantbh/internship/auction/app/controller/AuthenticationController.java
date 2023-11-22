package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.user.AuthenticationRequest;
import com.atlantbh.internship.auction.app.service.TokenService;
import com.atlantbh.internship.auction.app.service.provider.UserAuthentication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/authentication")
public class AuthenticationController {
    private final AuthenticationProvider authenticationProvider;
    private final TokenService tokenService;

    public AuthenticationController(final AuthenticationProvider authenticationProvider, final TokenService tokenService) {
        this.authenticationProvider = authenticationProvider;
        this.tokenService = tokenService;
    }

    @PostMapping
    ResponseEntity<Void> authenticateUser(@RequestBody AuthenticationRequest loginRequest) {
        final Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.email(), loginRequest.password());
        final UserAuthentication authenticationResponse = (UserAuthentication) authenticationProvider.authenticate(authentication);
        final String token = tokenService.generateToken(authenticationResponse);
        final HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.AUTHORIZATION, token);
        return new ResponseEntity<>(null, httpHeaders, HttpStatus.OK);
    }
}
