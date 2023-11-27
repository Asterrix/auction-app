package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.builder.ItemBuilder;
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
import com.atlantbh.internship.auction.app.service.impl.BiddingServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BiddingServiceTest {

    @InjectMocks
    BiddingServiceImpl biddingService;

    @Mock
    UserRepository userRepository;

    @Mock
    ItemRepository itemRepository;

    @Mock
    UserItemBidRepository userItemBidRepository;

    BidRequest bidRequest;

    @BeforeEach
    void setUp() {
        bidRequest = new BidRequest(1, 3, new BigDecimal("0"));
    }

    @Test
    @DisplayName("Offer is above allowed decimal scale")
    void makeAnOfferOnItem_offerDecimalScaleIsGreaterThanAllowed_throwValidationException() {
        final BigDecimal price = new BigDecimal("50.500000000000000");
        final BidRequest bid = new BidRequest(72, 390, price);

        final ValidationException result = assertThrows(AllowedDecimalScaleException.class,
                () -> biddingService.makeAnOfferOnItem(bid));

        assertEquals("Decimal precision must be limited to no more than two decimal places.", result.getMessage());
    }

    @Test
    @DisplayName("Offer is made with 2 decimal precision")
    void makeAnOfferOnItem_offerDecimalScaleIsTwo_continueExecution() {
        final BigDecimal price = new BigDecimal("50.00");
        final BidRequest bid = new BidRequest(72, 390, price);

        assertDoesNotThrow(() -> {
            try {
                biddingService.makeAnOfferOnItem(bid);
            } catch (AllowedDecimalScaleException e) {
                fail("Offer is within allowed decimal scale.");
            } catch (ValidationException e) {
                return;
            }
        });
    }

    @Test
    @DisplayName("Offer is made with 1 decimal precision")
    void makeAnOfferOnItem_offerDecimalScaleIsOne_continueExecution() {
        final BigDecimal price = new BigDecimal("50.0");
        final BidRequest bid = new BidRequest(72, 390, price);

        assertDoesNotThrow(() -> {
            try {
                biddingService.makeAnOfferOnItem(bid);
            } catch (AllowedDecimalScaleException e) {
                fail("Offer is within allowed decimal scale.");
            } catch (ValidationException e) {
                return;
            }
        });
    }

    @Test
    @DisplayName("Offer is made with 0 decimal precision")
    void makeAnOfferOnItem_offerDecimalScaleIsZeroWithDot_continueExecution() {
        final BigDecimal price = new BigDecimal("50.");
        final BidRequest bid = new BidRequest(72, 390, price);

        assertDoesNotThrow(() -> {
            try {
                biddingService.makeAnOfferOnItem(bid);
            } catch (AllowedDecimalScaleException e) {
                fail("Offer is within allowed decimal scale.");
            } catch (ValidationException e) {
                return;
            }
        });
    }

    @Test
    @DisplayName("Offer includes a fractional part with a non-zero remainder")
    void makeAnOfferOnItem_offerRemainderIsNonZero_continueExecution() {
        final BidRequest bid = new BidRequest(72, 390, new BigDecimal("50.51"));

        assertThrows(FractionalDivisionIsNotZero.class, () -> biddingService.makeAnOfferOnItem(bid));
    }

    @Test
    @DisplayName("Offer includes a fractional part divided by 10")
    void makeAnOfferOnItem_offerDividedByTenRemainderIsZero_continueExecution() {
        final BidRequest bid = new BidRequest(72, 390, new BigDecimal("50.90"));

        assertDoesNotThrow(() -> {
            try {
                biddingService.makeAnOfferOnItem(bid);
            } catch (FractionalDivisionIsNotZero e) {
                fail("Remainder should be zero when divided by 10");
            } catch (ValidationException e) {
                return;
            }
        });
    }

    @Test
    @DisplayName("Offer includes a fractional part divided by 5")
    void makeAnOfferOnItem_offerDividedByFiveRemainderIsZero_continueExecution() {
        final BidRequest bid = new BidRequest(72, 390, new BigDecimal("50.15"));

        assertDoesNotThrow(() -> {
            try {
                biddingService.makeAnOfferOnItem(bid);
            } catch (FractionalDivisionIsNotZero e) {
                fail("Five should be allowed");
            } catch (ValidationException e) {
                return;
            }
        });
    }

    @Test
    @DisplayName("Item does not exist")
    void makeAnOfferOnItem_whenItemDoesNotExist_throwValidationException() {
        when(itemRepository.findByIdAndEndDateLessThanEqual(any(Integer.class), any(LocalDate.class)))
                .thenReturn(Optional.empty());

        final ValidationException result = assertThrows(ValidationException.class,
                () -> biddingService.makeAnOfferOnItem(bidRequest),
                "The item must be found before an offer can be made.");

        assertEquals("The item does not exist.", result.getMessage());
    }

    @Test
    @DisplayName("Bidder does not exist")
    void makeAnOfferOnItem_whenBidderDoesNotExist_throwValidationException() {
        when(itemRepository.findByIdAndEndDateLessThanEqual(any(Integer.class), any(LocalDate.class)))
                .thenReturn(Optional.of(new ItemBuilder().build()));

        when(userRepository.findById(any(Integer.class))).thenReturn(Optional.empty());

        final ValidationException result = assertThrows(ValidationException.class,
                () -> biddingService.makeAnOfferOnItem(bidRequest));

        assertEquals("The bidder could not be found.", result.getMessage());
    }

    @Test
    @DisplayName("The user is attempting to bid on his own item")
    void makeAnOfferOnItem_whenBidderTriesToBidOnHisOwnItem_throwValidationException() {
        final User user = new User();
        final Item item = new ItemBuilder()
                .setOwner(user)
                .build();

        when(itemRepository.findByIdAndEndDateLessThanEqual(any(Integer.class), any(LocalDate.class)))
                .thenReturn(Optional.of(item));

        when(userRepository.findById(any(Integer.class)))
                .thenReturn(Optional.of(user));

        final ValidationException validationException = assertThrows(ValidationException.class,
                () -> biddingService.makeAnOfferOnItem(bidRequest));
        assertEquals(user, item.getOwner());
        assertEquals("The user is not permitted to make offers on his own items.", validationException.getMessage());
    }

    @Test
    @DisplayName("The offer is lower than the starting price")
    void makeAnOfferOnItem_whenBidderMakesAnOfferThatIsLessThanInitialPrice_throwValidationException() {
        final Item item = new ItemBuilder()
                .setInitialPrice(new BigDecimal("80"))
                .setOwner(new User())
                .build();
        item.setId(20);

        final BidRequest bid = new BidRequest(72, 390, new BigDecimal("70"));

        when(itemRepository.findByIdAndEndDateLessThanEqual(any(Integer.class), any(LocalDate.class)))
                .thenReturn(Optional.of(item));

        when(userRepository.findById(any(Integer.class)))
                .thenReturn(Optional.of(new User()));

        when(userItemBidRepository.findDistinctByItem_IdOrderByAmountDesc(any(Integer.class)))
                .thenReturn(List.of());


        final ValidationException validationException = assertThrows(ValidationException.class,
                () -> biddingService.makeAnOfferOnItem(bid),
                "The bidder's offer must either exceed or match the seller's initial price.");

        assertEquals("The bid must match or exceed the starting price.", validationException.getMessage());
    }

    @Test
    @DisplayName("The offer matches the initialPrice")
    void makeAnOfferOnItem_whenThereAreNoOffersAndBidderMakesMatchingOfferForInitialPrice_continueExecution() {
        final BigDecimal price = new BigDecimal("50.50");

        final Item item = new ItemBuilder()
                .setInitialPrice(price)
                .setOwner(new User())
                .build();
        item.setId(20);

        final User user = new User();
        final BidRequest bid = new BidRequest(72, 390, price);

        when(itemRepository.findByIdAndEndDateLessThanEqual(any(Integer.class), any(LocalDate.class)))
                .thenReturn(Optional.of(item));

        when(userRepository.findById(any(Integer.class)))
                .thenReturn(Optional.of(user));

        when(userItemBidRepository.findDistinctByItem_IdOrderByAmountDesc(any(Integer.class)))
                .thenReturn(List.of());


        assertEquals(item.getInitialPrice(), bid.amount());
        assertDoesNotThrow(() -> biddingService.makeAnOfferOnItem(bid));
    }

    @Test
    @DisplayName("Offer is less than the current highest bid")
    void makeAnOfferOnItem_whenBidderMakesAnOfferThatIsLessThanCurrentHighestBid_throwValidationException() {
        final Item item = new ItemBuilder()
                .setInitialPrice(new BigDecimal("20"))
                .setOwner(new User())
                .build();
        item.setId(20);
        final BidRequest request = new BidRequest(72, 390, new BigDecimal("50"));
        final List<UserItemBid> itemBids = List.of(
                new UserItemBid(new User(), item, new BigDecimal("80")),
                new UserItemBid(new User(), item, new BigDecimal("40")),
                new UserItemBid(new User(), item, new BigDecimal("20"))
        );

        when(itemRepository.findByIdAndEndDateLessThanEqual(any(Integer.class), any(LocalDate.class)))
                .thenReturn(Optional.of(item));

        when(userRepository.findById(any(Integer.class)))
                .thenReturn(Optional.of(new User()));

        when(userItemBidRepository.findDistinctByItem_IdOrderByAmountDesc(any(Integer.class)))
                .thenReturn(itemBids);


        final ValidationException validationException = assertThrows(ValidationException.class,
                () -> biddingService.makeAnOfferOnItem(request));

        assertEquals("Your bid must be greater than the current one.", validationException.getMessage());
    }
}