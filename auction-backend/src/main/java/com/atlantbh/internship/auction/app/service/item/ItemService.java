package com.atlantbh.internship.auction.app.service.item;

import com.atlantbh.internship.auction.app.dto.aggregate.ItemAggregate;
import com.atlantbh.internship.auction.app.dto.item.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.item.ItemSummaryDto;
import com.atlantbh.internship.auction.app.dto.item.requests.CreateItemRequest;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.repository.BidRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

public interface ItemService {
    Page<ItemSummaryDto> getAllItems(final Specification<Item> specification, final Pageable pageable);


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

    Item createItem(final CreateItemRequest createItemRequest,
                    final Category category,
                    final User owner);


    Item setItemImages(final Item item, final List<ItemImage> itemImages);

    List<Item> findAllItemsByOwnerId(final Integer ownerId);

    void saveItem(final Item item);

    Optional<Item> findItemById(final Integer itemId);

    Item updateItemFinishedAttribute(final Item item);
}
