package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.item.UserItemDto;

import java.util.List;

public interface UserService {
    List<UserItemDto> findAllItemsOwnedByUser();
}
