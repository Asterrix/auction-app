package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface ItemService {
    Page<ItemSummaryDto> getAll(final Integer pageNumber, final Integer pageSize, final String sortByAttribute, final String sortDirection);
}
