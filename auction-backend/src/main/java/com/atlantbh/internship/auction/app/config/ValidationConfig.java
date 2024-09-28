package com.atlantbh.internship.auction.app.config;

import com.atlantbh.internship.auction.app.dto.bid.BidRequest;
import com.atlantbh.internship.auction.app.dto.user.RegistrationRequest;
import com.atlantbh.internship.auction.app.model.utils.MainValidationClass;
import com.atlantbh.internship.auction.app.service.validation.BiddingOfferValidator;
import com.atlantbh.internship.auction.app.service.validation.EmailValidator;
import com.atlantbh.internship.auction.app.service.validation.PasswordValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ValidationConfig {

    @Bean("registrationValidation")
    public MainValidationClass<RegistrationRequest> registrationRequestValidator() {
        return new MainValidationClass<>(
                List.of(
                        req -> {
                            new EmailValidator().validate(req.email());
                            new PasswordValidator().validate(req.password());
                        }
                )
        );
    }

    @Bean("biddingValidation")
    public MainValidationClass<BidRequest> bidRequestValidator() {
        return new MainValidationClass<>(
                List.of(
                        req -> {
                            new BiddingOfferValidator().validate(req.amount());
                        }
                )
        );
    }
}
