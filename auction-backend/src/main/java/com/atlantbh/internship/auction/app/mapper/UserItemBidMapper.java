package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.UserItemBidDto;
import com.atlantbh.internship.auction.app.entity.UserItemBid;

import java.math.BigDecimal;

public final class UserItemBidMapper {
    private UserItemBidMapper(){}

    public static UserItemBidDto convertToDto(final UserItemBid itemBid, final Long totalNumberOfBids){
        return new UserItemBidDto(itemBid.getAmount(), totalNumberOfBids);
    }

    public static UserItemBidDto convertToValuesOfZeroDto(){
        return new UserItemBidDto(new BigDecimal("0"), 0L);
    }
}
