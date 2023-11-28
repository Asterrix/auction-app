package com.atlantbh.internship.auction.app.dto.user;

import com.atlantbh.internship.auction.app.entity.UserItemBid;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link UserItemBid}
 */
public record UserItemBidDto(String highestBid, Long totalNumberOfBids) implements Serializable {
}