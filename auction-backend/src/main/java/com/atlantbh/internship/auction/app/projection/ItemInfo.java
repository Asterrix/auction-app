package com.atlantbh.internship.auction.app.projection;

import com.atlantbh.internship.auction.app.entity.Item;

import java.math.BigDecimal;

/**
 * Projection for {@link Item}
 */
public interface ItemInfo {
    Integer getId();

    String getName();

    String getDescription();

    BigDecimal getInitialPrice();
}