package com.atlantbh.internship.auction.app.service.validator;

import com.atlantbh.internship.auction.app.dto.user.RegistrationRequest;
import com.atlantbh.internship.auction.app.service.validator.user.EmailValidator;
import com.atlantbh.internship.auction.app.service.validator.user.PasswordValidator;
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
