package com.atlantbh.internship.auction.app.dto.aggregate;

import com.atlantbh.internship.auction.app.dto.bid.BiddingInformation;
import com.atlantbh.internship.auction.app.dto.item.ItemDto;
import com.atlantbh.internship.auction.app.entity.Item;

import java.io.Serializable;

/**
 * DTO for {@link Item}
 */
public record ItemAggregate(
        ItemDto item,
        BiddingInformation biddingInformation,
        Integer ownerId
) implements Serializable {
}