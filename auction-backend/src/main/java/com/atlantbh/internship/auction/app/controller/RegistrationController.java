package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.user.RegistrationRequest;
import com.atlantbh.internship.auction.app.service.RegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/register")
public class RegistrationController {
    private final RegistrationService registrationService;

    public RegistrationController(final RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<Void> registerUser(@RequestBody final RegistrationRequest user) {
        registrationService.registerUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
