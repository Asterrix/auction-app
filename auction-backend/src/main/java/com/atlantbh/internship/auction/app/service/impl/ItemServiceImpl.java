package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.dto.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.mapper.ItemMapper;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.service.ItemService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public final class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;

    public ItemServiceImpl(final ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Page<ItemSummaryDto> getAll(final Pageable pageable) {
        final Page<Item> items = itemRepository.findAll(pageable);
        return new PageImpl<>(ItemMapper.convertToSummaryDto(items.getContent()));
    }

    @Override
    public ItemFeaturedDto getFeatured() {
        final Optional<Item> item = itemRepository.findById(1);
        return item.map(ItemMapper::convertToFeaturedDto).orElseThrow();
    }
}