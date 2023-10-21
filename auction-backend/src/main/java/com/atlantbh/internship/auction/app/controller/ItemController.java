package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.service.ItemService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/items")
public class ItemController {
    public static final String DEFAULT_PAGE_NUMBER = "0";
    public static final String DEFAULT_PAGE_SIZE = "8";
    public static final String DEFAULT_SORT_BY_ATTRIBUTE = "id";
    public static final String DEFAULT_SORT_DIRECTION = "ASC";

    private final ItemService itemService;

    public ItemController(final ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<Page<ItemSummaryDto>> getAllItems(
            @RequestParam(defaultValue = DEFAULT_PAGE_NUMBER) final Integer pageNumber,
            @RequestParam(defaultValue = DEFAULT_PAGE_SIZE) final Integer pageSize,
            @RequestParam(defaultValue = DEFAULT_SORT_BY_ATTRIBUTE) final String sortByAttribute,
            @RequestParam(defaultValue = DEFAULT_SORT_DIRECTION) final String sortDirection) {

        Page<ItemSummaryDto> response = this.itemService.getAll(pageNumber, pageSize, sortByAttribute, sortDirection);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
