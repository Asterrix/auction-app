package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.config.claims.ClaimsExtractor;
import com.atlantbh.internship.auction.app.dto.bid.BidItemSummary;
import com.atlantbh.internship.auction.app.dto.bid.BidRequest;
import com.atlantbh.internship.auction.app.dto.bid.UserBidsAggregate;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.entity.UserItemBid;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.model.impl.TimeRemainingCalculator;
import com.atlantbh.internship.auction.app.model.utils.MainValidationClass;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.repository.UserItemBidRepository;
import com.atlantbh.internship.auction.app.repository.UserRepository;
import com.atlantbh.internship.auction.app.service.BiddingService;
import com.atlantbh.internship.auction.app.service.validation.bidding.BidComparer;
import com.atlantbh.internship.auction.app.service.validation.bidding.OwnerValidation;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BiddingServiceImpl implements BiddingService {
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final UserItemBidRepository userItemBidRepository;
    private final ClaimsExtractor claimsExtractor;
    private final MainValidationClass<BidRequest> requestValidator;
    private final OwnerValidation ownerValidation;
    private final BidComparer bidComparer;

    public BiddingServiceImpl(final ItemRepository itemRepository,
                              final UserRepository userRepository,
                              final UserItemBidRepository userItemBidRepository,
                              final ClaimsExtractor claimsExtractor,
                              final MainValidationClass<BidRequest> requestValidator,
                              final OwnerValidation ownerValidation,
                              final BidComparer bidComparer) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.userItemBidRepository = userItemBidRepository;
        this.claimsExtractor = claimsExtractor;
        this.requestValidator = requestValidator;
        this.ownerValidation = ownerValidation;
        this.bidComparer = bidComparer;
    }

    @Override
    public void makeAnOfferOnItem(final BidRequest bidRequest, final LocalDateTime timeOfRequest) {
        requestValidator.validate(bidRequest);

        final Item item = getItem(bidRequest.itemId(), timeOfRequest);
        final User bidder = getBidder(claimsExtractor.getUserId());
        ownerValidation.validate(item.getOwner(), bidder);

        if (!item.getUserItemBids().isEmpty()) {
            final BigDecimal highestBid = findHighestBid(item);
            bidComparer.compareOfferToHighestBid(bidRequest.amount(), highestBid);
        } else {
            final BigDecimal initialBid = item.getInitialPrice();
            bidComparer.compareOfferToInitialPrice(bidRequest.amount(), initialBid);
        }

        final UserItemBid bid = new UserItemBid(bidder, item, bidRequest.amount());
        userItemBidRepository.save(bid);
    }

    @Override
    public List<UserBidsAggregate> getUsersBiddingInformation() {
        final Integer userId = claimsExtractor.getUserId();

        return userItemBidRepository.findAllUserRelatedBids(userId)
                .stream()
                .map(this::mapUserBids)
                .collect(Collectors.toList());
    }

    private UserBidsAggregate mapUserBids(UserItemBid bid) {
        final Item item = bid.getItem();
        final BidItemSummary itemInfo = new BidItemSummary(item.getId(), item.getItemImages().getFirst().getImageUrl(), item.getName());
        final String timeRemaining = TimeRemainingCalculator.getTimeRemaining(LocalDateTime.now(), bid.getItem().getEndTime());
        final BigDecimal currentBid = bid.getAmount();
        final int numberOfBids = item.getUserItemBids().size();
        final BigDecimal highestBid = findHighestBid(item);

        return new UserBidsAggregate(itemInfo, timeRemaining, currentBid, numberOfBids, highestBid);
    }

    private User getBidder(final Integer bidderId) {
        return userRepository
                .findById(bidderId)
                .orElseThrow(() -> new ValidationException("Bidder could not be found."));
    }

    private Item getItem(final Integer itemId, final LocalDateTime dateTime) {
        return itemRepository
                .findByIdAndEndTimeGreaterThan(itemId, dateTime)
                .orElseThrow(() -> new ValidationException("Item does not exist."));
    }

    private BigDecimal findHighestBid(final Item item) {
        return item
                .getUserItemBids()
                .stream()
                .max(Comparator.comparing(UserItemBid::getAmount))
                .orElseThrow(() -> new ValidationException("Highest bid could not be found."))
                .getAmount();
    }
}
