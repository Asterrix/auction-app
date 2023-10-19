package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.ItemDto;
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
    public ResponseEntity<Page<ItemDto>> getAllItems(@RequestParam(required = false, defaultValue = "0") Integer pageNumber,
                                                     @RequestParam(required = false, defaultValue = "9") Integer pageSize,
                                                     @RequestParam(required = false, defaultValue = "id") String sortBy,
                                                     @RequestParam(required = false, defaultValue = "ASC") String sortDirection) {

        Page<ItemDto> response = this.itemService.getAll(pageNumber, pageSize, sortBy, sortDirection);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
