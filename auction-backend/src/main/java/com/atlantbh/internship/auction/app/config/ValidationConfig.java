package com.atlantbh.internship.auction.app.config;

import com.atlantbh.internship.auction.app.dto.user.RegistrationRequest;
import com.atlantbh.internship.auction.app.model.utils.MainValidationClass;
import com.atlantbh.internship.auction.app.service.validation.EmailValidator;
import com.atlantbh.internship.auction.app.service.validation.PasswordValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ValidationConfig {

    @Bean("registrationValidator")
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
}
