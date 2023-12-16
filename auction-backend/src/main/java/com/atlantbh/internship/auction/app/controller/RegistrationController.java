package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.user.RegistrationRequest;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.service.RegistrationService;
import com.atlantbh.internship.auction.app.service.stripe.StripeService;
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
    private final StripeService stripeService;

    public RegistrationController(final RegistrationService registrationService,
                                  final StripeService stripeService) {
        this.registrationService = registrationService;
        this.stripeService = stripeService;
    }

    @PostMapping
    public ResponseEntity<Void> registerUser(@RequestBody final RegistrationRequest user) {
        final User registeredUser = registrationService.registerUser(user);
        stripeService.createCustomer(registeredUser);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
