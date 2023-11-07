package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.UserItemBidDto;
import com.atlantbh.internship.auction.app.dto.aggregate.ItemAggregate;
import com.atlantbh.internship.auction.app.dto.item.ItemDto;
import com.atlantbh.internship.auction.app.dto.item.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.item.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.entity.UserItemBid;
import com.atlantbh.internship.auction.app.mapper.ItemMapper;
import com.atlantbh.internship.auction.app.mapper.UserItemBidMapper;
import com.atlantbh.internship.auction.app.repository.ItemImageRepository;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.repository.UserItemBidRepository;
import com.atlantbh.internship.auction.app.service.ItemService;
import com.atlantbh.internship.auction.app.service.specification.UserItemBidSpecification;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static com.atlantbh.internship.auction.app.mapper.ItemMapper.convertToFeaturedDto;
import static com.atlantbh.internship.auction.app.mapper.ItemMapper.convertToSummaryDto;
import static com.atlantbh.internship.auction.app.service.specification.ItemSpecification.*;

@Service
public final class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final ItemImageRepository itemImageRepository;
    private final UserItemBidRepository userItemBidRepository;

    public ItemServiceImpl(final ItemRepository itemRepository,
                           final ItemImageRepository itemImageRepository,
                           final UserItemBidRepository userItemBidRepository) {
        this.itemRepository = itemRepository;
        this.itemImageRepository = itemImageRepository;
        this.userItemBidRepository = userItemBidRepository;
    }

    @Override
    public Page<ItemSummaryDto> getAllItems(@Nullable final String category,
                                            @Nullable final String subcategory,
                                            @Nullable final String itemName,
                                            final Pageable pageable) {

        Specification<Item> specification = Specification.allOf();

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

    @Override
    public Optional<ItemAggregate> getItemById(final Integer itemId) {
        final Optional<Item> item = itemRepository.findById(itemId);
        if (item.isEmpty()) return Optional.empty();

        final Specification<UserItemBid> specification = UserItemBidSpecification.isHighestBid(item.get().getId());

        final long totalNumberOfBids = userItemBidRepository.getTotalCount(item.get().getId());
        if (totalNumberOfBids == 0) {
            final ItemDto mappedItems = ItemMapper.convertToItemDto(item.get());
            final UserItemBidDto bidInformation = UserItemBidMapper.convertToValuesOfZeroDto();

            return Optional.of(ItemMapper.convertToAggregate(mappedItems, bidInformation));
        }

        final Optional<UserItemBid> highestBid = userItemBidRepository.findOne(specification);

        final ItemDto mappedItems = ItemMapper.convertToItemDto(item.get());
        final UserItemBidDto mappedBidInformation = UserItemBidMapper.convertToDto(highestBid.get(), totalNumberOfBids);

        return Optional.of(ItemMapper.convertToAggregate(mappedItems, mappedBidInformation));
    }

    @Override
    public ItemFeaturedDto getFeaturedItem() {
        final LocalDate endDateThreshold = LocalDate.now().plusDays(7);
        final Optional<Item> itemInfo = itemRepository.findFirstByEndDateGreaterThanEqualOrderByIdAsc(endDateThreshold);

        if (itemInfo.isEmpty()) {
            throw new NoSuchElementException("Featured item was not found.");
        }

        final Optional<ItemImage> itemImageInfo = itemImageRepository.findFirstByItem_IdOrderByIdAsc(itemInfo.get().getId());

        if (itemImageInfo.isEmpty()) {
            throw new NoSuchElementException("Featured item images were not found.");
        }

        return convertToFeaturedDto(itemInfo.get(), itemImageInfo.get());
    }
}