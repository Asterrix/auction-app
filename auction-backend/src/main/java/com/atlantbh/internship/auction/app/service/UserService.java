package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.item.UserItemDto;
import com.atlantbh.internship.auction.app.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findUserById(final Integer id);
    List<UserItemDto> findAllItemsOwnedByUser();
}
