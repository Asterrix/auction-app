package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.ItemDto;
import com.atlantbh.internship.auction.app.dto.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.mapper.ItemMapper;
import com.atlantbh.internship.auction.app.repository.ItemImageRepository;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.service.ItemService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public final class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final ItemImageRepository itemImageRepository;

    public ItemServiceImpl(final ItemRepository itemRepository, final ItemImageRepository itemImageRepository) {
        this.itemRepository = itemRepository;
        this.itemImageRepository = itemImageRepository;
    }

    @Override
    public Page<ItemSummaryDto> getAll(final Pageable pageable) {
        final Page<Item> items = itemRepository.findAll(pageable);
        return new PageImpl<>(ItemMapper.convertToSummaryDto(items.getContent()));
    }

    @Override
    public Optional<ItemDto> getItemById(final Integer itemId) {
        final Optional<Item> item = itemRepository.findById(itemId);
        return item.map(ItemMapper::convertToItemDto).or(Optional::empty);
    }

    @Override
    public ItemFeaturedDto getFeaturedItem() {
        final LocalDate endDateThreshold = LocalDate.now().plusDays(7);

        final Optional<Item> itemInfo = itemRepository.findFirstByEndDateGreaterThanEqualOrderByIdAsc(endDateThreshold);

        if (itemInfo.isEmpty()) {
            throw new NoSuchElementException("Featured item was not found.");
        }

        final Optional<ItemImage> itemImageInfo = itemImageRepository.findFirstByItem_IdOrderByIdAsc(itemInfo.get().getId());

        if (itemImageInfo.isEmpty()) {
            throw new NoSuchElementException("Featured item images were not found.");
        }

        return ItemMapper.convertToFeaturedDto(itemInfo.get(), itemImageInfo.get());
    }
}