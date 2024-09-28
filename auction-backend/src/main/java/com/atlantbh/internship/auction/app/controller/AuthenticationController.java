package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.user.AuthenticationRequest;
import com.atlantbh.internship.auction.app.service.AuthenticationService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/authentication")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(final AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping
    ResponseEntity<Void> authenticateUser(@RequestBody AuthenticationRequest loginRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", authenticationService.authenticateUser(loginRequest));
        return ResponseEntity.ok().headers(headers).build();
    }
}
