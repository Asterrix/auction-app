package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.user.UserRegistrationDto;
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
    public ResponseEntity<String> registerUser(@RequestBody final UserRegistrationDto user) {
        return new ResponseEntity<>(registrationService.registerUser(user), HttpStatus.CREATED);
    }
}
