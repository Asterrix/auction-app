package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.config.claims.ClaimsExtractor;
import com.atlantbh.internship.auction.app.dto.aggregate.ItemAggregate;
import com.atlantbh.internship.auction.app.dto.item.ItemDto;
import com.atlantbh.internship.auction.app.dto.item.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.item.ItemSummaryDto;
import com.atlantbh.internship.auction.app.dto.item.requests.CreateItemRequest;
import com.atlantbh.internship.auction.app.dto.item.requests.GetItemsRequest;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.mapper.ItemImageMapper;
import com.atlantbh.internship.auction.app.mapper.ItemMapper;
import com.atlantbh.internship.auction.app.service.featured.FeaturedItemSuggestion;
import com.atlantbh.internship.auction.app.model.utils.MainValidationClass;
import com.atlantbh.internship.auction.app.service.CategoryService;
import com.atlantbh.internship.auction.app.service.UserService;
import com.atlantbh.internship.auction.app.service.auth.AuthenticationService;
import com.atlantbh.internship.auction.app.service.firebase.FirebaseStorageService;
import com.atlantbh.internship.auction.app.service.item.ItemService;
import com.atlantbh.internship.auction.app.specification.ItemSpecificationProcessor;
import com.google.cloud.storage.Blob;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
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
    private final FeaturedItemSuggestion featuredSuggestion;
    private final AuthenticationService authenticationService;

    public ItemController(final ItemService itemService,
                          final CategoryService categoryService,
                          final UserService userService,
                          final ClaimsExtractor claimsExtractor,
                          final FirebaseStorageService firebaseStorageService,
                          final MainValidationClass<CreateItemRequest> createItemInitialValidation,
                          final FeaturedItemSuggestion featuredSuggestion,
                          final AuthenticationService authenticationService) {
        this.itemService = itemService;
        this.categoryService = categoryService;
        this.userService = userService;
        this.claimsExtractor = claimsExtractor;
        this.firebaseStorageService = firebaseStorageService;
        this.createItemInitialValidation = createItemInitialValidation;
        this.featuredSuggestion = featuredSuggestion;
        this.authenticationService = authenticationService;
    }

    @GetMapping
    public ResponseEntity<Page<ItemSummaryDto>> getItems(final GetItemsRequest request, final Pageable pageable) {
        final Specification<Item> specification = new ItemSpecificationProcessor().process(request);
        final Page<ItemSummaryDto> items = itemService.getAllItems(specification, pageable);

        return new ResponseEntity<>(items, HttpStatus.OK);
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

    @GetMapping("suggestions")
    public ResponseEntity<List<ItemSummaryDto>> getSuggestions(@RequestParam("query") @Nullable final String query,
                                                               @RequestParam("suggestionsCount") @Nullable final Integer suggestionsCount) {

        final boolean authenticated = authenticationService.isAuthenticated();
        final int maxCount = 12;
        final int regularCount = 3;
        final int count = (suggestionsCount != null && suggestionsCount <= maxCount) ? suggestionsCount : regularCount;


        final List<Item> suggestions = authenticated
                ? featuredSuggestion.suggestions(claimsExtractor.getUserId(), query, count)
                : featuredSuggestion.suggestions(query, count);


        if (suggestions.size() < count) {
            throw new IllegalArgumentException("There are insufficient items found for the specified criteria to return a suggestion.");
        }

        final List<ItemSummaryDto> mappedItems = ItemMapper.convertToSummaryDto(suggestions);
        return new ResponseEntity<>(mappedItems, HttpStatus.OK);
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
