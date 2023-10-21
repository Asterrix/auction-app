package com.atlantbh.internship.auction.app.mapper.impl;

import com.atlantbh.internship.auction.app.dto.ItemImageDto;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.mapper.Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public final class ItemImageMapper implements Mapper<ItemImage, ItemImageDto> {
    @Override
    public ItemImage toEntity(final ItemImageDto dto) {
        ItemImage entity = new ItemImage();
        entity.setId(dto.id());
        entity.setName(dto.name());
        entity.setImageUrl(dto.imageUrl());
        return entity;
    }

    @Override
    public ItemImageDto toDto(final ItemImage entity) {
        return new ItemImageDto(entity.getId(), entity.getName(), entity.getImageUrl());
    }

    @Override
    public List<ItemImage> toEntity(final List<ItemImageDto> dtoList) {
        return dtoList.stream().map(this::toEntity).toList();
    }

    @Override
    public List<ItemImageDto> toDto(final List<ItemImage> entityList) {
        return entityList.stream().map(this::toDto).toList();
    }
}
