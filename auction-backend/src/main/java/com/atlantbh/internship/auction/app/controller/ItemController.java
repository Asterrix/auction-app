package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.config.claims.ClaimsExtractor;
import com.atlantbh.internship.auction.app.dto.aggregate.ItemAggregate;
import com.atlantbh.internship.auction.app.dto.item.CreateItemRequest;
import com.atlantbh.internship.auction.app.dto.item.ItemDto;
import com.atlantbh.internship.auction.app.dto.item.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.item.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.mapper.ItemImageMapper;
import com.atlantbh.internship.auction.app.model.utils.MainValidationClass;
import com.atlantbh.internship.auction.app.service.CategoryService;
import com.atlantbh.internship.auction.app.service.UserService;
import com.atlantbh.internship.auction.app.service.firebase.FirebaseStorageService;
import com.atlantbh.internship.auction.app.service.item.ItemService;
import com.google.cloud.storage.Blob;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/items")
public class ItemController {
    private final ItemService itemService;
    private final CategoryService categoryService;
    private final UserService userService;
    private final ClaimsExtractor claimsExtractor;
    private final FirebaseStorageService firebaseStorageService;
    private final MainValidationClass<CreateItemRequest> createItemInitialValidation;

    public ItemController(final ItemService itemService,
                          final CategoryService categoryService,
                          final UserService userService,
                          final ClaimsExtractor claimsExtractor,
                          final FirebaseStorageService firebaseStorageService,
                          final MainValidationClass<CreateItemRequest> createItemInitialValidation) {
        this.itemService = itemService;
        this.categoryService = categoryService;
        this.userService = userService;
        this.claimsExtractor = claimsExtractor;
        this.firebaseStorageService = firebaseStorageService;
        this.createItemInitialValidation = createItemInitialValidation;
    }

    @GetMapping
    public ResponseEntity<Page<ItemSummaryDto>> getAllItems(@RequestParam @Nullable final String category,
                                                            @RequestParam @Nullable final String subcategory,
                                                            @RequestParam @Nullable final String itemName,
                                                            final Pageable pageable) {
        return new ResponseEntity<>(itemService.getAllItems(category, subcategory, itemName, pageable), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ItemAggregate> getItemById(@PathVariable("id") final Integer itemId) {
        final ZonedDateTime timeOfRequest = ZonedDateTime.now();
        final Optional<Item> optionalItem = itemService.findItemById(itemId);

        if (optionalItem.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        final ItemAggregate result = itemService
                .getItemById(itemId, timeOfRequest)
                .orElseThrow(() -> new IllegalArgumentException(String.format("Item with id: %d could not be found.", itemId)));

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("featured")
    public ResponseEntity<ItemFeaturedDto> getFeaturedItem() {
        return new ResponseEntity<>(itemService.getFeaturedItem(), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<ItemDto> createItem(@RequestPart CreateItemRequest item, @RequestPart List<MultipartFile> images) {
        createItemInitialValidation.validate(item);

        final Category category = categoryService
                .findCategoryByName(item.subcategory())
                .orElseThrow(() -> new ValidationException("Category could not be found."));

        final User user = userService
                .findUserById(claimsExtractor.getUserId())
                .orElseThrow(() -> new ValidationException("User could not be found."));

        final List<Blob> blobList = firebaseStorageService.uploadFiles(images);
        final Item createdItem = itemService.createItem(item, category, user);

        final List<ItemImage> itemImages = ItemImageMapper.convertFromBlob(blobList, createdItem);

        final Item finalItem = itemService.setItemImages(createdItem, itemImages);
        itemService.saveItem(finalItem);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
