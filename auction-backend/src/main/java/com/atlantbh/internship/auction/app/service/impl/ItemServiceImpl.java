package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.mapper.SummaryMapper;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.service.ItemService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    public Page<ItemSummaryDto> getAll(final Integer pageNumber, final Integer pageSize, final String sortByAttribute, final String sortDirection) {
        Sort.Direction direction;

        switch (sortDirection) {
            case "ASC" -> direction = Sort.Direction.ASC;
            case "DESC" -> direction = Sort.Direction.DESC;
            default -> direction = Sort.DEFAULT_DIRECTION;
        }

        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(direction, sortByAttribute));

        Page<Item> itemPage = itemRepository.findAll(pageRequest);

        List<ItemSummaryDto> itemSummaryList = itemPage.getContent().stream().map(summaryMapper::toDto).toList();

        return new PageImpl<>(itemSummaryList, pageRequest, itemPage.getTotalElements());
    }
}