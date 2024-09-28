package com.atlantbh.internship.auction.app.service.validation.item;

import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.model.utils.Validator;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.ValidationException;
import jakarta.validation.ValidatorFactory;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class ItemEntityValidation implements Validator<Item> {

    @Override
    public void validate(final Item item) {
        try (final ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory()) {
            final jakarta.validation.Validator validator = validatorFactory.getValidator();
            final Set<ConstraintViolation<Item>> violations = validator.validate(item);

            if (!violations.isEmpty()) {
                final String message = violations.stream().findFirst().toString();
                throw new ValidationException(message);
            }
        }
    }

}
