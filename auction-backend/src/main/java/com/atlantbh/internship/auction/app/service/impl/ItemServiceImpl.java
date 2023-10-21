package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.mapper.SummaryMapper;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.service.ItemService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final SummaryMapper<Item, ItemSummaryDto> summaryMapper;

    public ItemServiceImpl(final ItemRepository itemRepository, final SummaryMapper<Item, ItemSummaryDto> summaryMapper) {
        this.itemRepository = itemRepository;
        this.summaryMapper = summaryMapper;
    }

    @Override
    public Page<ItemSummaryDto> getAll(final Pageable pageable) {
        return new PageImpl<>(itemRepository.findAll(pageable).stream().map(summaryMapper::toDto).toList());
    }
}