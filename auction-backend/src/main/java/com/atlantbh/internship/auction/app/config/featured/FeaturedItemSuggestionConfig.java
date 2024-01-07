package com.atlantbh.internship.auction.app.config.featured;

import com.atlantbh.internship.auction.app.service.featured.price.PriceSuggestion;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Configuration
public class FeaturedItemSuggestionConfig {

    @Bean
    PriceSuggestion itemPriceSuggestion() {
        final BigDecimal startingPriceMultiplier = new BigDecimal("0.5");
        final BigDecimal endPriceMultiplier = new BigDecimal("1.5");
        final int decimalScale = 2;
        final RoundingMode roundingMode = RoundingMode.HALF_DOWN;


        return new PriceSuggestion(
                startingPriceMultiplier,
                endPriceMultiplier,
                decimalScale,
                roundingMode
        );
    }
}
