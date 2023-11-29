package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.bid.BidRequest;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.entity.UserItemBid;
import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.model.utils.MainValidationClass;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.repository.UserItemBidRepository;
import com.atlantbh.internship.auction.app.repository.UserRepository;
import com.atlantbh.internship.auction.app.service.impl.BiddingServiceImpl;
import com.atlantbh.internship.auction.app.service.validation.BiddingOfferValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BiddingServiceTest {

    @Mock
    UserRepository userRepository;

    @Mock
    ItemRepository itemRepository;

    @Mock
    UserItemBidRepository userItemBidRepository;

    @Mock
    MainValidationClass<BidRequest> validationClass;

    @InjectMocks
    BiddingServiceImpl biddingService;

    BidRequest bidRequest;

    @BeforeEach
    void setUp() {
        bidRequest = new BidRequest(1, 3, new BigDecimal("0"));
    }

    @Test
    @DisplayName("Item does not exist")
    void makeAnOfferOnItem_whenItemDoesNotExist_throwValidationException() {
        when(itemRepository.findByIdAndEndTimeGreaterThan(any(Integer.class), any(LocalDateTime.class)))
                .thenReturn(Optional.empty());

        final ValidationException result = assertThrows(ValidationException.class,
                () -> biddingService.makeAnOfferOnItem(bidRequest),
                "The item must be found before an offer can be made.");

        assertEquals("The item does not exist.", result.getMessage());
    }

    @Test
    @DisplayName("Bidder does not exist")
    void makeAnOfferOnItem_whenBidderDoesNotExist_throwValidationException() {
        when(itemRepository.findByIdAndEndTimeGreaterThan(any(Integer.class), any(LocalDateTime.class)))
                .thenReturn(Optional.of(new Item()));

        when(userRepository.findById(any(Integer.class))).thenReturn(Optional.empty());

        final ValidationException result = assertThrows(ValidationException.class,
                () -> biddingService.makeAnOfferOnItem(bidRequest));

        assertEquals("The bidder could not be found.", result.getMessage());
    }

    @Test
    @DisplayName("The user is attempting to bid on his own item")
    void makeAnOfferOnItem_whenBidderTriesToBidOnHisOwnItem_throwValidationException() {
        final User user = new User();
        final Item item = new Item();
        item.setOwner(user);

        when(itemRepository.findByIdAndEndTimeGreaterThan(any(Integer.class), any(LocalDateTime.class)))
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
        final Item item = new Item();
        item.setId(20);
        item.setOwner(new User());
        item.setInitialPrice(new BigDecimal("80"));

        final BidRequest bid = new BidRequest(72, 390, new BigDecimal("70"));

        when(itemRepository.findByIdAndEndTimeGreaterThan(any(Integer.class), any(LocalDateTime.class)))
                .thenReturn(Optional.of(item));

        when(userRepository.findById(any(Integer.class)))
                .thenReturn(Optional.of(new User()));

        when(userItemBidRepository.findDistinctByItem_IdOrderByAmountDesc(any(Integer.class)))
                .thenReturn(List.of());


        final ValidationException validationException = assertThrows(ValidationException.class,
                () -> biddingService.makeAnOfferOnItem(bid),
                "The bidder's offer must either exceed or match the seller's initial price.");

        assertEquals("Initial bid must match or exceed the starting price.", validationException.getMessage());
    }

    @Test
    @DisplayName("The offer matches the initialPrice")
    void makeAnOfferOnItem_whenThereAreNoOffersAndBidderMakesMatchingOfferForInitialPrice_continueExecution() {
        final BigDecimal price = new BigDecimal("50.50");
        final Item item = new Item();
        item.setId(20);
        item.setOwner(new User());
        item.setInitialPrice(price);
        final User user = new User();
        final BidRequest bid = new BidRequest(72, 390, price);

        when(itemRepository.findByIdAndEndTimeGreaterThan(any(Integer.class), any(LocalDateTime.class)))
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
        final Item item = new Item();
        item.setId(20);
        item.setOwner(new User());
        item.setInitialPrice(new BigDecimal("20"));
        final BidRequest request = new BidRequest(72, 390, new BigDecimal("50"));
        final User user = new User();
        final List<UserItemBid> itemBids = List.of(
                new UserItemBid(user, item, new BigDecimal("80")),
                new UserItemBid(user, item, new BigDecimal("40")),
                new UserItemBid(user, item, new BigDecimal("20"))
        );

        when(itemRepository.findByIdAndEndTimeGreaterThan(any(Integer.class), any(LocalDateTime.class)))
                .thenReturn(Optional.of(item));

        when(userRepository.findById(any(Integer.class)))
                .thenReturn(Optional.of(user));

        when(userItemBidRepository.findDistinctByItem_IdOrderByAmountDesc(any(Integer.class)))
                .thenReturn(itemBids);


        final ValidationException validationException = assertThrows(ValidationException.class,
                () -> biddingService.makeAnOfferOnItem(request));

        assertEquals("Your bid must be greater than the current one.", validationException.getMessage());
    }
}