package com.atlantbh.internship.auction.app.mapper;

import com.atlantbh.internship.auction.app.dto.aggregate.ItemAggregate;
import com.atlantbh.internship.auction.app.dto.bid.BiddingInformation;
import com.atlantbh.internship.auction.app.dto.item.ItemDto;
import com.atlantbh.internship.auction.app.dto.item.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.item.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Bid;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.model.impl.TimeRemainingCalculator;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

public final class ItemMapper {
    private ItemMapper() {
    }

    public static ItemSummaryDto convertToSummaryDto(final Item entity) {
        final BigDecimal currentPrice = entity.getBids()
                .stream()
                .map(Bid::getAmount)
                .max(BigDecimal::compareTo)
                .orElse(entity.getInitialPrice());

        return new ItemSummaryDto(
                entity.getId(),
                entity.getName(),
                entity.getInitialPrice(),
                currentPrice,
                ItemImageMapper.convertToDto(entity.getItemImages().getFirst())
        );
    }

    public static List<ItemSummaryDto> convertToSummaryDto(final List<Item> entityList) {
        return entityList.stream().map(ItemMapper::convertToSummaryDto).toList();
    }

    public static ItemDto convertToItemDto(final Item entity, final ZonedDateTime currentTime) {
        return new ItemDto(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getInitialPrice(),
                TimeRemainingCalculator.getTimeRemaining(currentTime, entity.getEndTime()),
                ItemImageMapper.convertToDto(entity.getItemImages()),
                entity.getFinished()
        );
    }

    public static ItemFeaturedDto convertToFeaturedDto(final Item item, final ItemImage itemImage) {
        return new ItemFeaturedDto(
                item.getId(),
                item.getName(),
                item.getDescription(),
                item.getInitialPrice(),
                ItemImageMapper.convertToDto(itemImage));
    }

    public static ItemAggregate convertToAggregate(final ItemDto itemDto, final BiddingInformation itemBidDto, final Integer ownerId) {
        return new ItemAggregate(itemDto, itemBidDto, ownerId);
    }
}
