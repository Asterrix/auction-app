package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.aggregate.ItemAggregate;
import com.atlantbh.internship.auction.app.dto.item.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.item.ItemSummaryDto;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ItemService {
    Page<ItemSummaryDto> getAllItems(@Nullable final String category,
                                     @Nullable final String subcategory,
                                     @Nullable final String itemName,
                                     final Pageable pageable);

    Optional<ItemAggregate> getItemById(final Integer itemId);

    ItemFeaturedDto getFeaturedItem();
}
