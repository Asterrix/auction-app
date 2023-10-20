package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import org.springframework.data.domain.Page;

public interface ItemService {
    Page<ItemSummaryDto> getAll(Integer pageNumber, Integer pageSize, String sortByAttribute, String sortDirection);
}
