package com.atlantbh.internship.auction.app.service.item;

import com.atlantbh.internship.auction.app.entity.Item;

import java.math.BigDecimal;

public interface ItemPrice {
    BigDecimal findHighestPriceItem(final Item highestInitialPriceItem, final Item highestBidItem);

    BigDecimal findLowestPriceItem(final Item lowestInitialPriceItem, final Item lowestBidItem);
}
