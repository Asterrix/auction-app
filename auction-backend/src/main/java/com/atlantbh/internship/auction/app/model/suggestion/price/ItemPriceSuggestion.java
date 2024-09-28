package com.atlantbh.internship.auction.app.model.suggestion.price;

import com.atlantbh.internship.auction.app.entity.Item;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

public final class ItemPriceSuggestion implements PriceSuggestion {
    private final BigDecimal startingPriceMultiplicand;
    private final BigDecimal endingPriceMultiplicand;
    private final Byte decimalScale;
    private final RoundingMode roundingMode;

    public ItemPriceSuggestion(final BigDecimal startingPriceMultiplicand,
                               final BigDecimal endingPriceMultiplicand,
                               final Byte decimalScale,
                               final RoundingMode roundingMode) {
        this.startingPriceMultiplicand = startingPriceMultiplicand;
        this.endingPriceMultiplicand = endingPriceMultiplicand;
        this.decimalScale = decimalScale;
        this.roundingMode = roundingMode;
    }

    @Override
    public BigDecimal calculateAveragePrice(final List<Item> items) {
        final BigDecimal itemsSize = new BigDecimal(items.size());

        return items.stream()
                .map(Item::getInitialPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .divide(itemsSize, roundingMode);
    }

    @Override
    public BigDecimal calculateStartingPriceEndpoint(final BigDecimal averageItemPrice) {
        return averageItemPrice
                .multiply(startingPriceMultiplicand)
                .setScale(decimalScale, roundingMode);
    }

    @Override
    public BigDecimal calculateEndingPriceEndpoint(final BigDecimal averageItemPrice) {
        return averageItemPrice
                .multiply(endingPriceMultiplicand)
                .setScale(decimalScale, roundingMode);
    }
}
