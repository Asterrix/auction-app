package com.atlantbh.internship.auction.app.dto.aggregate;

import com.atlantbh.internship.auction.app.dto.bid.BidNumberCount;
import com.atlantbh.internship.auction.app.dto.item.ItemDto;
import com.atlantbh.internship.auction.app.entity.Item;

import java.io.Serializable;

/**
 * DTO for {@link Item}
 */
public record ItemAggregate(ItemDto item, BidNumberCount biddingInformation, Integer ownerId) implements Serializable {
}