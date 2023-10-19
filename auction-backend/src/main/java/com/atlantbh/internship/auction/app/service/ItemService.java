package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.ItemDto;
import org.springframework.data.domain.Page;

public interface ItemService {
    Page<ItemDto> getAll(Integer pageNumber, Integer pageSize, String sortBy, String sortDirection);
}
