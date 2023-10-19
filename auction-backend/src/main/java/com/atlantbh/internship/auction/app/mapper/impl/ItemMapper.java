package com.atlantbh.internship.auction.app.mapper.impl;

import com.atlantbh.internship.auction.app.dto.ItemDto;
import com.atlantbh.internship.auction.app.dto.ItemImageDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.mapper.Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemMapper implements Mapper<Item, ItemDto> {
    private final Mapper<ItemImage, ItemImageDto> itemImageMapper;

    public ItemMapper(Mapper<ItemImage, ItemImageDto> itemImageMapper) {
        this.itemImageMapper = itemImageMapper;
    }

    @Override
    public Item toEntity(ItemDto dto) {
        Item entity = new Item();
        entity.setId(dto.id());
        entity.setName(dto.name());
        entity.setDescription(dto.description());
        entity.setInitialPrice(dto.initialPrice());
        entity.setStartDate(dto.startDate());
        entity.setEndDate(dto.endDate());
        entity.setItemImages(dto.itemImages().stream().map(itemImageMapper::toEntity).toList());
        return entity;
    }

    @Override
    public ItemDto toDto(Item entity) {
        return new ItemDto(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getInitialPrice(),
                entity.getStartDate(),
                entity.getEndDate(),
                entity.getItemImages().stream().map(itemImageMapper::toDto).toList()
        );
    }

    @Override
    public List<Item> toEntity(List<ItemDto> dtoList) {
        return dtoList.stream().map(this::toEntity).toList();
    }

    @Override
    public List<ItemDto> toDto(List<Item> entityList) {
        return entityList.stream().map(this::toDto).toList();
    }
}
