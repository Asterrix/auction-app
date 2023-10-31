package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.item.ItemDto;
import com.atlantbh.internship.auction.app.dto.item.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.item.ItemSummaryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ItemService {
    Page<ItemSummaryDto> getAllItems(final Pageable pageable);

    Optional<ItemDto> getItemById(final Integer itemId);

    ItemFeaturedDto getFeaturedItem();
}
