package com.atlantbh.internship.auction.app.service.featured.price;

import com.atlantbh.internship.auction.app.entity.Item;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

public final class PriceSuggestion {
    private final BigDecimal startingPriceMultiplicand;
    private final BigDecimal endingPriceMultiplicand;
    private final int decimalScale;
    private final RoundingMode roundingMode;

    public PriceSuggestion(final BigDecimal startingPriceMultiplicand,
                           final BigDecimal endingPriceMultiplicand,
                           final int decimalScale,
                           final RoundingMode roundingMode) {
        this.startingPriceMultiplicand = startingPriceMultiplicand;
        this.endingPriceMultiplicand = endingPriceMultiplicand;
        this.decimalScale = decimalScale;
        this.roundingMode = roundingMode;
    }

    public BigDecimal calculateAveragePrice(final List<Item> items) {
        final BigDecimal itemsSize = new BigDecimal(items.size());

        return items.stream()
                .map(Item::getInitialPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .divide(itemsSize, roundingMode);
    }

    public BigDecimal calculateStartingPriceEndpoint(final BigDecimal averageItemPrice) {
        return averageItemPrice
                .multiply(startingPriceMultiplicand)
                .setScale(decimalScale, roundingMode);
    }

    public BigDecimal calculateEndingPriceEndpoint(final BigDecimal averageItemPrice) {
        return averageItemPrice
                .multiply(endingPriceMultiplicand)
                .setScale(decimalScale, roundingMode);
    }
}
