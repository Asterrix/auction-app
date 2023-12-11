package com.atlantbh.internship.auction.app.dto.item;

import com.atlantbh.internship.auction.app.dto.bid.TableItemSummary;
import com.atlantbh.internship.auction.app.entity.Item;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link Item}
 */

public record UserItemDto(
        TableItemSummary item,
        String timeRemaining,
        Integer numberOfBids,
        BigDecimal highestBid,
        Boolean finished) implements Serializable {
}
