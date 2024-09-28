package com.atlantbh.internship.auction.app.model.suggestion.price;

import com.atlantbh.internship.auction.app.entity.Item;

import java.math.BigDecimal;
import java.util.List;

public interface PriceSuggestion {
    BigDecimal calculateAveragePrice(final List<Item> items);

    BigDecimal calculateStartingPriceEndpoint(final BigDecimal averageItemPrice);

    BigDecimal calculateEndingPriceEndpoint(final BigDecimal averageItemPrice);
}
