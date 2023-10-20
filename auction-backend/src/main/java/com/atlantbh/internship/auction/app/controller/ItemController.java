package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.config.constant.ItemGetAllRequestConstant;
import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.service.ItemService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/items")
@CrossOrigin(origins = "http://localhost:4200/")
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<Page<ItemSummaryDto>> getAllItems(
            @RequestParam(defaultValue = ItemGetAllRequestConstant.DEFAULT_PAGE_NUMBER) Integer pageNumber,
            @RequestParam(defaultValue = ItemGetAllRequestConstant.DEFAULT_PAGE_SIZE) Integer pageSize,
            @RequestParam(defaultValue = ItemGetAllRequestConstant.DEFAULT_SORT_BY_ATTRIBUTE) String sortByAttribute,
            @RequestParam(defaultValue = ItemGetAllRequestConstant.DEFAULT_SORT_DIRECTION) String sortDirection) {

        Page<ItemSummaryDto> response = this.itemService.getAll(pageNumber, pageSize, sortByAttribute, sortDirection);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
