package com.atlantbh.internship.auction.app.service.item;

import com.atlantbh.internship.auction.app.entity.Bid;
import com.atlantbh.internship.auction.app.entity.Item;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Comparator;

@Component
public class ItemPriceImpl implements ItemPrice {
    @Override
    public BigDecimal findHighestPriceItem(final Item highestInitialPriceItem, final Item highestBidItem) {
        final BigDecimal highestInitialPrice = highestInitialPriceItem.getInitialPrice();
        final BigDecimal highestBidPrice = highestBidItem.getBids()
                .stream()
                .max(Comparator.comparing(Bid::getAmount))
                .orElseThrow()
                .getAmount();

        return highestInitialPrice.compareTo(highestBidPrice) > 0 ? highestInitialPrice : highestBidPrice;
    }

    @Override
    public BigDecimal findLowestPriceItem(final Item lowestInitialPriceItem, final Item lowestBidItem) {
        final BigDecimal lowestInitialPrice = lowestInitialPriceItem.getInitialPrice();
        final BigDecimal lowestBidPrice = lowestBidItem.getBids()
                .stream()
                .min(Comparator.comparing(Bid::getAmount))
                .orElseThrow()
                .getAmount();

        return lowestInitialPrice.compareTo(lowestBidPrice) < 0 ? lowestInitialPrice : lowestBidPrice;
    }
}
