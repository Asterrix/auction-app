package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.aggregate.ItemAggregate;
import com.atlantbh.internship.auction.app.dto.item.CreateItemRequest;
import com.atlantbh.internship.auction.app.dto.item.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.item.ItemSummaryDto;
import com.atlantbh.internship.auction.app.repository.BidRepository;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

public interface ItemService {
    /**
     * Retrieves a page of item summaries based on optional filtering criteria.
     * Uses implementation of Specification Api to filter items by grouping specified parameters together.
     *
     * @param category    An optional name of the category to filter items. Can be {@code null} if not specified.
     * @param subcategory An optional name of the subcategory to filter items. Can be {@code null} if not specified.
     * @param itemName    An optional name of the item to filter items. Can be {@code null} if not specified.
     * @param pageable    An instance of {@link Pageable} to control pagination.
     * @return A {@link Page} containing {@link ItemSummaryDto} objects.
     */
    Page<ItemSummaryDto> getAllItems(@Nullable final String category,
                                     @Nullable final String subcategory,
                                     @Nullable final String itemName,
                                     final Pageable pageable);

    /**
     * Retrieves full item details by their unique identifier.
     * Method will make separate calls to {@link BidRepository} in order to fetch the total number of bids placed
     * on that item.
     *
     * @param itemId Unique identifier.
     * @return {@link Optional} of {@link ItemAggregate}.
     */

    Optional<ItemAggregate> getItemById(final Integer itemId, final ZonedDateTime timeOfRequest);

    ItemFeaturedDto getFeaturedItem();

    void createItem(final CreateItemRequest createItemRequest, final List<MultipartFile> file) throws IOException;
}
