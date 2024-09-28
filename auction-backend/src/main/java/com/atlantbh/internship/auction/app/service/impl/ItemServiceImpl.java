package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.ItemDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.mapper.Mapper;
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
    private final Mapper<Item, ItemDto> mapper;

    public ItemServiceImpl(ItemRepository itemRepository, Mapper<Item, ItemDto> mapper) {
        this.itemRepository = itemRepository;
        this.mapper = mapper;
    }

    @Override
    public Page<ItemDto> getAll(Integer pageNumber, Integer pageSize, String sortBy, String sortDirection) {
        Sort.Direction direction;

        switch (sortDirection) {
            case "ASC" -> direction = Sort.Direction.ASC;
            case "DESC" -> direction = Sort.Direction.DESC;
            default -> direction = Sort.DEFAULT_DIRECTION;
        }

        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(direction, sortBy));

        Page<Item> itemPage = itemRepository.findAll(pageRequest);

        List<ItemDto> itemDtoList = itemPage.getContent().stream().map(mapper::toDto).toList();

        return new PageImpl<>(itemDtoList, pageRequest, itemPage.getTotalElements());
    }
}
