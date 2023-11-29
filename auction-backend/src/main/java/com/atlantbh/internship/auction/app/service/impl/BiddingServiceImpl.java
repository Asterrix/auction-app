package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.config.claims.ClaimsExtractor;
import com.atlantbh.internship.auction.app.dto.bid.BidRequest;
import com.atlantbh.internship.auction.app.dto.bid.BiddingItem;
import com.atlantbh.internship.auction.app.dto.bid.UserBiddingInfo;
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
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BiddingServiceImpl implements BiddingService {
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final UserItemBidRepository userItemBidRepository;
    private final ClaimsExtractor claimsExtractor;
    private final MainValidationClass<BidRequest> validationClass;

    public BiddingServiceImpl(final ItemRepository itemRepository,
                              final UserRepository userRepository,
                              final UserItemBidRepository userItemBidRepository,
                              final ClaimsExtractor claimsExtractor,
                              final MainValidationClass<BidRequest> validationClass) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.userItemBidRepository = userItemBidRepository;
        this.claimsExtractor = claimsExtractor;
        this.validationClass = validationClass;
    }

    private void validateOwner(final User seller, final User bidder) {
        if (seller.equals(bidder)) {
            throw new ValidationException("The user is not permitted to make offers on his own items.");
        }
    }

    private void validateOffer(final BigDecimal offer, final Item item, final List<UserItemBid> biddingList) {
        if (biddingList.isEmpty()) {
            final BigDecimal initialPrice = item.getInitialPrice();

            if (offer.compareTo(initialPrice) < 0) {
                throw new ValidationException("Initial bid must match or exceed the starting price.");
            }
        } else {
            final BigDecimal highestBid = biddingList.getFirst().getAmount();

            if (offer.compareTo(highestBid) <= 0) {
                throw new ValidationException("Your bid must be greater than the current one.");
            }
        }
    }

    @Override
    public void makeAnOfferOnItem(final BidRequest bidRequest) {
        validationClass.validate(bidRequest);

        final LocalDateTime currentDateTime = LocalDateTime.now();
        final User bidder = getBidder(bidRequest.bidderId());
        final Item item = getItem(bidRequest.itemId(), currentDateTime);
        validateOwner(item.getOwner(), bidder);

        final List<UserItemBid> listOfItemBids = userItemBidRepository.findAllBidsForItem(item.getId());
        validateOffer(bidRequest.amount(), item, listOfItemBids);

        final UserItemBid bid = new UserItemBid(bidder, item, bidRequest.amount());
        userItemBidRepository.save(bid);
    }

    @Override
    public List<UserBiddingInfo> getUsersBiddingInformation() {
        final Integer userId = claimsExtractor.getUserId();
        final List<UserItemBid> allBidsRelatedToUser = userItemBidRepository.findAllUserRelatedBids(userId);

        if (allBidsRelatedToUser.isEmpty()) {
            return new ArrayList<>();
        }

        List<UserBiddingInfo> biddingInformation = new ArrayList<>();
        allBidsRelatedToUser.forEach(bid -> {
            final Item item = bid.getItem();

            biddingInformation.add(
                    new UserBiddingInfo(
                            new BiddingItem(item.getId(), item.getItemImages().getFirst().getImageUrl(), item.getName()),
                            TimeRemainingCalculator.getTimeRemaining(LocalDateTime.now(), bid.getItem().getEndTime()),
                            bid.getAmount().toString(),
                            item.getUserItemBids().size(),
                            userItemBidRepository.listOfHighestBids(item.getId()).getFirst().getAmount().toString()
                    )
            );
        });

        return biddingInformation;
    }

    private User getBidder(final Integer bidderId) {
        return userRepository
                .findById(bidderId)
                .orElseThrow(() -> new ValidationException("The bidder could not be found."));
    }

    private Item getItem(final Integer itemId, final LocalDateTime dateTime) {
        return itemRepository
                .findByIdAndEndTimeGreaterThan(itemId, dateTime)
                .orElseThrow(() -> new ValidationException("The item does not exist."));
    }
}
