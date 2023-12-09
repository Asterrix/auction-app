package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.config.claims.ClaimsExtractor;
import com.atlantbh.internship.auction.app.dto.aggregate.ItemAggregate;
import com.atlantbh.internship.auction.app.dto.bid.BidNumberCount;
import com.atlantbh.internship.auction.app.dto.item.CreateItemRequest;
import com.atlantbh.internship.auction.app.dto.item.ItemDto;
import com.atlantbh.internship.auction.app.dto.item.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.item.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.*;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.mapper.BidsMapper;
import com.atlantbh.internship.auction.app.mapper.ItemImageMapper;
import com.atlantbh.internship.auction.app.mapper.ItemMapper;
import com.atlantbh.internship.auction.app.model.utils.MainValidationClass;
import com.atlantbh.internship.auction.app.repository.*;
import com.atlantbh.internship.auction.app.service.ItemService;
import com.atlantbh.internship.auction.app.service.specification.UserItemBidSpecification;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.*;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static com.atlantbh.internship.auction.app.config.FeaturedItemConfig.FEATURED_ITEM_END_DATE_THRESHOLD;
import static com.atlantbh.internship.auction.app.mapper.ItemMapper.convertToFeaturedDto;
import static com.atlantbh.internship.auction.app.mapper.ItemMapper.convertToSummaryDto;
import static com.atlantbh.internship.auction.app.service.specification.ItemSpecification.*;

@Service
public final class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final ItemImageRepository itemImageRepository;
    private final BidRepository bidRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final MainValidationClass<CreateItemRequest> createItemValidation;
    private final ClaimsExtractor claimsExtractor;

    public ItemServiceImpl(final ItemRepository itemRepository,
                           final ItemImageRepository itemImageRepository,
                           final BidRepository bidRepository,
                           final CategoryRepository categoryRepository,
                           final UserRepository userRepository,
                           final MainValidationClass<CreateItemRequest> createItemValidation,
                           ClaimsExtractor claimsExtractor) {
        this.itemRepository = itemRepository;
        this.itemImageRepository = itemImageRepository;
        this.bidRepository = bidRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.createItemValidation = createItemValidation;
        this.claimsExtractor = claimsExtractor;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Page<ItemSummaryDto> getAllItems(@Nullable final String category,
                                            @Nullable final String subcategory,
                                            @Nullable final String itemName,
                                            final Pageable pageable) {

        Specification<Item> specification = Specification.allOf(isActive(ZonedDateTime.now()));

        if (subcategory != null) {
            specification = specification.and(isPartOfSubcategory(category, subcategory));
        } else if (category != null) {
            specification = specification.and(isPartOfCategory(category));
        }

        if (itemName != null) specification = specification.and(isNameOf(itemName));

        final Page<Item> items = itemRepository.findAll(specification, pageable);

        final List<ItemSummaryDto> mappedItems = convertToSummaryDto(items.getContent());
        final long totalElements = items.getTotalElements();

        return new PageImpl<>(mappedItems, pageable, totalElements);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<ItemAggregate> getItemById(final Integer itemId, final ZonedDateTime timeOfRequest) {
        final Optional<Item> item = itemRepository.findById(itemId);
        if (item.isEmpty()) return Optional.empty();

        final Specification<Bid> specification = UserItemBidSpecification.isHighestBid(item.get().getId());

        final long totalNumberOfBids = bidRepository.countDistinctByItem_Id(item.get().getId());
        if (totalNumberOfBids == 0) {
            final ItemDto mappedItems = ItemMapper.convertToItemDto(item.get(), timeOfRequest);
            final BidNumberCount bidInformation = BidsMapper.mapToUserItemBidDto(new BigDecimal("0"), 0L);

            final Integer ownerId = item.get().getOwner().getId();
            return Optional.of(ItemMapper.convertToAggregate(mappedItems, bidInformation, ownerId));
        }

        final Optional<Bid> highestBid = bidRepository.findOne(specification);

        final ItemDto mappedItem = ItemMapper.convertToItemDto(item.get(), timeOfRequest);
        final BidNumberCount mappedBidInformation = BidsMapper.mapToUserItemBidDto(highestBid.get().getAmount(), totalNumberOfBids);

        final Integer ownerId = item.get().getOwner().getId();
        return Optional.of(ItemMapper.convertToAggregate(mappedItem, mappedBidInformation, ownerId));
    }

    @Override
    public ItemFeaturedDto getFeaturedItem() {
        final ZonedDateTime endTimeThreshold = ZonedDateTime.of(
                LocalDate.now().plusDays(FEATURED_ITEM_END_DATE_THRESHOLD),
                LocalTime.now(),
                ZoneId.systemDefault());
        final Optional<Item> itemInfo = itemRepository.findFirstByEndTimeGreaterThanEqualOrderByIdAsc(endTimeThreshold);

        if (itemInfo.isEmpty()) {
            throw new NoSuchElementException("Featured item was not found.");
        }

        final Optional<ItemImage> itemImageInfo = itemImageRepository.findFirstByItem_IdOrderByIdAsc(itemInfo.get().getId());

        if (itemImageInfo.isEmpty()) {
            throw new NoSuchElementException("Featured item images were not found.");
        }

        return convertToFeaturedDto(itemInfo.get(), itemImageInfo.get());
    }

    @Override
    public void createItem(final CreateItemRequest createItemRequest) {
        createItemValidation.validate(createItemRequest);

        final Category category = getCategory(createItemRequest);
        final User user = getUser();

        final Item item = new Item(
                createItemRequest.name(),
                createItemRequest.description(),
                createItemRequest.initialPrice(),
                createItemRequest.startTime(),
                createItemRequest.endTime(),
                List.of(),
                category,
                user
        );

        final List<ItemImage> itemImages = ItemImageMapper.convertToEntity(createItemRequest.images(), item);
        item.setItemImages(itemImages);

        itemRepository.save(item);
    }

    private User getUser() {
        return userRepository
                .findById(claimsExtractor.getUserId())
                .orElseThrow(() -> new ValidationException("User could not be found."));
    }

    private Category getCategory(final CreateItemRequest createItemRequest) {
        return categoryRepository
                .findByNameAllIgnoreCase(createItemRequest.category())
                .orElseThrow(() -> new ValidationException("Category could not be found."));
    }
}