package com.atlantbh.internship.auction.app.config;

import com.atlantbh.internship.auction.app.model.suggestion.category.CategorySuggestion;
import com.atlantbh.internship.auction.app.model.suggestion.category.ItemCategorySuggestion;
import com.atlantbh.internship.auction.app.model.suggestion.price.ItemPriceSuggestion;
import com.atlantbh.internship.auction.app.model.suggestion.search.SearchQuerySuggestion;
import com.atlantbh.internship.auction.app.model.suggestion.search.SearchSuggestion;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Configuration
public class FeaturedItemSuggestionConfig {
    private final static BigDecimal STARTING_PRICE_MULTIPLIER = new BigDecimal("0.5");
    private final static BigDecimal END_PRICE_MULTIPLIER = new BigDecimal("1.5");
    private final static Byte DECIMAL_SCALE = 2;
    private final static RoundingMode ROUNDING_MODE = RoundingMode.HALF_DOWN;


    @Bean
    ItemPriceSuggestion itemPriceSuggestion() {
        return new ItemPriceSuggestion(
                STARTING_PRICE_MULTIPLIER,
                END_PRICE_MULTIPLIER,
                DECIMAL_SCALE,
                ROUNDING_MODE
        );
    }

    @Bean
    SearchQuerySuggestion searchQuerySuggestion() {
        return new SearchSuggestion();
    }

    @Bean
    CategorySuggestion categorySuggestion() {
        return new ItemCategorySuggestion();
    }
}
