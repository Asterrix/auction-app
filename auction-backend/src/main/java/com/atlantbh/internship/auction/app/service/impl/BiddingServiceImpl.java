package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.bid.BidRequest;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.entity.UserItemBid;
import com.atlantbh.internship.auction.app.exception.AllowedDecimalScaleException;
import com.atlantbh.internship.auction.app.exception.FractionalDivisionIsNotZero;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.repository.UserItemBidRepository;
import com.atlantbh.internship.auction.app.repository.UserRepository;
import com.atlantbh.internship.auction.app.service.BiddingService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class BiddingServiceImpl implements BiddingService {
    private static final byte ALLOWED_DECIMAL_SCALE = 2;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final UserItemBidRepository userItemBidRepository;

    public BiddingServiceImpl(final ItemRepository itemRepository,
                              final UserRepository userRepository,
                              final UserItemBidRepository userItemBidRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.userItemBidRepository = userItemBidRepository;
    }

    private static void validateOwner(final Item item, final User bidder) {
        final User itemOwner = item.getOwner();
        if (itemOwner.equals(bidder)) {
            throw new ValidationException("The user is not permitted to make offers on his own items.");
        }
    }

    private static UserItemBid createBid(final BidRequest bidRequest, final User bidder, final Item item) {
        return new UserItemBid(bidder, item, bidRequest.amount());
    }

    private static void validateDecimalScale(final BigDecimal offer) {
        final int offerDecimalScale = offer.scale();

        if (offerDecimalScale > ALLOWED_DECIMAL_SCALE) {
            throw new AllowedDecimalScaleException("Decimal precision must be limited to no more than two decimal places.");
        }
    }

    // Ensures that the fractional part of the offer is a multiple of 5 or multiple of 10, preventing offers like $50.01 on an item priced at $50.00.
    // Offers with decimal places that can be rounded to a multiple of 5 or 10, like $50.10 or $50.15, will be considered valid.
    // Fractional / Mantissa (the numbers that come after decimal separator)
    public static void validateFractionalPart(final BigDecimal number) {
        final int trailingZeros = number.stripTrailingZeros().scale();
        if (trailingZeros == 0) {
            return;
        }

        String numberString = String.valueOf(number);
        int decimalIndex = numberString.indexOf(".");
        String decimalPart = numberString.substring(decimalIndex + 1);

        int fractionalPart = Integer.parseInt(decimalPart);
        final int remainderOfFive  = (fractionalPart * 2) % 5;
        final int remainderOfTen  = fractionalPart % 10;

        if (remainderOfFive != 0 && remainderOfTen != 0) {
            throw new FractionalDivisionIsNotZero("Offer must be a multiple of 5 or 10.");
        }
    }

    @Override
    public void makeAnOfferOnItem(final BidRequest bidRequest) {
        validateDecimalScale(bidRequest.amount());
        validateFractionalPart(bidRequest.amount());

        final LocalDate currentDate = LocalDate.now();
        final Item item = getItem(bidRequest.itemId(), currentDate);
        final User bidder = getBidder(bidRequest.bidderId());

        validateOwner(item, bidder);
        validateOffer(bidRequest, item);

        final UserItemBid bid = createBid(bidRequest, bidder, item);
        saveBidToDb(bid);
    }

    private void saveBidToDb(final UserItemBid bid) {
        userItemBidRepository.save(bid);
    }

    private void validateOffer(final BidRequest bidRequest, final Item item) {
        final List<UserItemBid> itemBidList = userItemBidRepository.findDistinctByItem_IdOrderByAmountDesc(item.getId());
        final BigDecimal currentOffer = bidRequest.amount();

        if (itemBidList.isEmpty()) {
            final BigDecimal initialPrice = item.getInitialPrice();

            if (currentOffer.compareTo(initialPrice) < 0) {
                throw new ValidationException("The bid must match or exceed the starting price.");
            }
        } else {
            final BigDecimal highestBid = itemBidList.getFirst().getAmount();

            if (currentOffer.compareTo(highestBid) < 0) {
                throw new ValidationException("Your bid must be greater than the current one.");
            }
        }
    }

    private User getBidder(final Integer bidderId) {
        return userRepository
                .findById(bidderId)
                .orElseThrow(() -> new ValidationException("The bidder could not be found."));
    }

    private Item getItem(final Integer itemId, final LocalDate date) {
        return itemRepository
                .findByIdAndEndDateLessThanEqual(itemId, date)
                .orElseThrow(() -> new ValidationException("The item does not exist."));
    }
}
