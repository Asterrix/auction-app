package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.ItemDto;
import com.atlantbh.internship.auction.app.dto.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.service.ItemService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/items")
public final class ItemController {
    private final ItemService itemService;

    public ItemController(final ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<Page<ItemSummaryDto>> getAllItems(final Pageable pageable) {
        return new ResponseEntity<>(itemService.getAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDto> getItemById(@PathVariable("id") final Integer itemId) {
        final Optional<ItemDto> result = itemService.getById(itemId);

        return result.map(itemDto -> new ResponseEntity<>(itemDto, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("featured")
    public ResponseEntity<ItemFeaturedDto> getFeaturedItem() {
        return new ResponseEntity<>(itemService.getFeatured(), HttpStatus.OK);
    }
}
