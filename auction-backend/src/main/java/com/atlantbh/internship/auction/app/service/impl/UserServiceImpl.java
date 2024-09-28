package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.config.claims.ClaimsExtractor;
import com.atlantbh.internship.auction.app.dto.item.UserItemDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.mapper.UserItemsMapper;
import com.atlantbh.internship.auction.app.repository.UserRepository;
import com.atlantbh.internship.auction.app.service.item.ItemService;
import com.atlantbh.internship.auction.app.service.UserService;
import com.atlantbh.internship.auction.app.service.item.ItemStateChanger;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final ClaimsExtractor claimsExtractor;
    private final ItemService itemService;
    private final UserRepository userRepository;
    private final ItemStateChanger itemStateChanger;

    public UserServiceImpl(final ClaimsExtractor claimsExtractor,
                           @Lazy final ItemService itemService,
                           final UserRepository userRepository,
                           final ItemStateChanger itemStateChanger) {
        this.claimsExtractor = claimsExtractor;
        this.itemService = itemService;
        this.userRepository = userRepository;
        this.itemStateChanger = itemStateChanger;
    }

    @Override
    public Optional<User> findUserById(final Integer id) {
        return userRepository.findById(claimsExtractor.getUserId());
    }

    @Override
    public List<UserItemDto> findAllItemsOwnedByUser() {
        final Integer userId = claimsExtractor.getUserId();
        final List<Item> items = itemService.findAllItemsByOwnerId(userId);
        final List<Item> updatedItems = itemStateChanger.updateFinishedAttribute(items);

        return UserItemsMapper.mapToUserItemDto(updatedItems);
    }
}
