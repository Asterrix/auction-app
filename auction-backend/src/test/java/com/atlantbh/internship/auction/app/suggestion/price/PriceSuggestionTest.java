package com.atlantbh.internship.auction.app.suggestion.price;

import com.atlantbh.internship.auction.app.config.FeaturedItemSuggestionConfig;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.model.suggestion.price.ItemPriceSuggestion;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(classes = {FeaturedItemSuggestionConfig.class})
class PriceSuggestionTest {

    @Autowired
    private ItemPriceSuggestion priceSuggestion;

    @Test
    @DisplayName("Average price")
    void testCalculateAveragePrice_AveragePriceShouldBeOneHundred() {
        final List<Item> items = List.of(new Item(), new Item(), new Item());
        items.get(0).setInitialPrice(new BigDecimal("50.00"));
        items.get(1).setInitialPrice(new BigDecimal("100.00"));
        items.get(2).setInitialPrice(new BigDecimal("150.00"));

        final BigDecimal averagePrice = priceSuggestion.calculateAveragePrice(items);

        assertEquals(new BigDecimal("100.00"), averagePrice, "Average price should be 100.00");
    }

    @Test
    @DisplayName("Starting price")
    void testCalculateStartingPriceEndpoint_WhenTheAveragePriceIsOneHundred_ReturnFifty() {
        final BigDecimal averagePrice = new BigDecimal("100.00");

        final BigDecimal startingPriceEndpoint = priceSuggestion.calculateStartingPriceEndpoint(averagePrice);

        assertEquals(new BigDecimal("50.00"), startingPriceEndpoint, "Starting price should be 50.00");
    }

    @Test
    @DisplayName("Ending price")
    void testCalculateEndingPriceEndpoint_WhenTheAveragePriceIsOneHundred_ReturnOneHundredFifty() {
        final BigDecimal averagePrice = new BigDecimal("100.00");

        final BigDecimal endingPriceEndpoint = priceSuggestion.calculateEndingPriceEndpoint(averagePrice);

        assertEquals(new BigDecimal("150.00"), endingPriceEndpoint, "Ending price should be 150.00");
    }
}