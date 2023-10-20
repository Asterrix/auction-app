package com.atlantbh.internship.auction.app.mapper.impl;

import com.atlantbh.internship.auction.app.dto.ItemImageDto;
import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.mapper.Mapper;
import com.atlantbh.internship.auction.app.mapper.SummaryMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public final class ItemSummaryMapper implements SummaryMapper<Item, ItemSummaryDto> {
    private final Mapper<ItemImage, ItemImageDto> itemImageMapper;

    public ItemSummaryMapper(Mapper<ItemImage, ItemImageDto> itemImageMapper) {
        this.itemImageMapper = itemImageMapper;
    }

    @Override
    public ItemSummaryDto toDto(Item entity) {
        ItemImage itemImage = entity.getItemImages().getFirst();

        return new ItemSummaryDto(
                entity.getId(),
                entity.getName(),
                entity.getInitialPrice(),
                itemImageMapper.toDto(itemImage));
    }

    @Override
    public List<ItemSummaryDto> toDto(List<Item> entityList) {
        return entityList.stream().map(this::toDto).toList();
    }
}
