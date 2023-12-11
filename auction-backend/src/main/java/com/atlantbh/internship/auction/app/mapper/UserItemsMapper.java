package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.bid.TableItemSummary;
import com.atlantbh.internship.auction.app.dto.item.UserItemDto;
import com.atlantbh.internship.auction.app.entity.Bid;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.model.impl.TimeRemainingCalculator;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import static com.atlantbh.internship.auction.app.mapper.BidsMapper.mapToBidItemSummary;

public final class UserItemsMapper {
    private UserItemsMapper() {
    }

    public static UserItemDto mapToUserItemDto(final Item item) {
        final String thumbnail = item.getItemImages().getFirst().getImageUrl();
        final TableItemSummary itemSummary = mapToBidItemSummary(item.getId(), thumbnail, item.getName());
        final String timeRemaining = TimeRemainingCalculator.getTimeRemaining(ZonedDateTime.now(), item.getEndTime());

        final int numberOfBids = item.getUserItemBids().size();

        final Optional<Bid> highestBid = item.getUserItemBids()
                .stream()
                .max(Comparator.comparing(Bid::getAmount));


        return new UserItemDto(
                itemSummary,
                timeRemaining,
                numberOfBids,
                highestBid.isEmpty() ? new BigDecimal("0") : highestBid.get().getAmount());
    }

    public static List<UserItemDto> mapToUserItemDto(final List<Item> items) {
        return items.stream().map(UserItemsMapper::mapToUserItemDto).toList();
    }
}
