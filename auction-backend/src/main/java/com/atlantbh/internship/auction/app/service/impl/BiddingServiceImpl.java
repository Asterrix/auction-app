package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.config.claims.ClaimsExtractor;
import com.atlantbh.internship.auction.app.dto.bid.BidRequest;
import com.atlantbh.internship.auction.app.dto.bid.UserBidsAggregate;
import com.atlantbh.internship.auction.app.entity.Bid;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.mapper.BidsMapper;
import com.atlantbh.internship.auction.app.model.utils.MainValidationClass;
import com.atlantbh.internship.auction.app.repository.BidRepository;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
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
    private final BidRepository bidRepository;
    private final ClaimsExtractor claimsExtractor;
    private final MainValidationClass<BidRequest> requestValidator;
    private final OwnerValidation ownerValidation;
    private final BidComparer bidComparer;

    public BiddingServiceImpl(final ItemRepository itemRepository,
                              final UserRepository userRepository,
                              final BidRepository bidRepository,
                              final ClaimsExtractor claimsExtractor,
                              final MainValidationClass<BidRequest> requestValidator,
                              final OwnerValidation ownerValidation,
                              final BidComparer bidComparer) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.bidRepository = bidRepository;
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

        final BigDecimal offer = bidRequest.amount();
        final Enum<OfferType> offerType = determineTypeOfOffer(item.getUserItemBids());
        compareOfferToCurrentOffers(offerType, item, offer);

        final Bid bid = new Bid(bidder, item, offer);
        bidRepository.save(bid);
    }

    private void compareOfferToCurrentOffers(final Enum<OfferType> offerType, final Item item, final BigDecimal offer) {
        if (offerType.equals(OfferType.INITIAL_BID)) {
            final BigDecimal initialBid = item.getInitialPrice();
            bidComparer.compareOfferToInitialPrice(offer, initialBid);
        } else if (offerType.equals(OfferType.NEW_BID)) {
            final BigDecimal highestBid = findHighestBid(item);
            bidComparer.compareOfferToHighestBid(offer, highestBid);
        }
    }

    private Enum<OfferType> determineTypeOfOffer(final List<Bid> bids) {
        return bids.isEmpty() ? OfferType.INITIAL_BID : OfferType.NEW_BID;
    }

    @Override
    public List<UserBidsAggregate> getUserBiddingHistory() {
        final Integer userId = claimsExtractor.getUserId();

        return bidRepository.findAllUserRelatedBids(userId)
                .stream()
                .map((final Bid bid) -> {
                    final BigDecimal highestBid = findHighestBid(bid.getItem());
                    return BidsMapper.mapToUserBidsAggregate(bid, highestBid);
                })
                .collect(Collectors.toList());
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
                .max(Comparator.comparing(Bid::getAmount))
                .orElseThrow(() -> new ValidationException("Highest bid could not be found."))
                .getAmount();
    }

    private enum OfferType {
        INITIAL_BID,
        NEW_BID
    }
}
