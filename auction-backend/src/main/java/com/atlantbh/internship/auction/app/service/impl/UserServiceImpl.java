package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.config.claims.ClaimsExtractor;
import com.atlantbh.internship.auction.app.dto.item.UserItemDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.mapper.UserItemsMapper;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final ClaimsExtractor claimsExtractor;
    private final ItemRepository itemRepository;

    public UserServiceImpl(final ClaimsExtractor claimsExtractor, final ItemRepository itemRepository) {
        this.claimsExtractor = claimsExtractor;
        this.itemRepository = itemRepository;
    }

    @Override
    public List<UserItemDto> findAllItemsOwnedByUser() {
        final Integer userId = claimsExtractor.getUserId();
        final List<Item> items = itemRepository.findByOwner_Id(userId);

        return UserItemsMapper.mapToUserItemDto(items);
    }
}
