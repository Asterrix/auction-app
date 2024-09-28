package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.aggregate.ItemAggregate;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.repository.BidRepository;
import com.atlantbh.internship.auction.app.repository.ItemImageRepository;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.service.impl.ItemServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ItemServiceTest {

    @Mock
    private ItemRepository itemRepository;

    @Mock
    private ItemImageRepository imageRepository;

    @Mock
    private BidRepository itemBidRepository;

    private ItemServiceImpl service;

    private Item item;

    @BeforeEach
    void setUp() {
        service = new ItemServiceImpl(itemRepository, imageRepository, itemBidRepository);
        item = new Item(
                "Item",
                "Desc",
                new BigDecimal("40.00"),
                ZonedDateTime.now(),
                ZonedDateTime.now(),
                List.of(),
                new Category(),
                new User());
        item.setId(1);
    }

    @Test
    void getItemById_ShouldReturnItem() {
        final Optional<Item> optionalItem = Optional.of(item);

        when(itemRepository.findById(anyInt())).thenReturn(optionalItem);
        final Optional<ItemAggregate> result = service.getItemById(anyInt(), ZonedDateTime.now());

        assertTrue(result.isPresent());
    }

    @Test
    void getItemById_ShouldReturnEmptyOptional() {
        final Optional<Item> optionalItem = Optional.empty();

        when(itemRepository.findById(anyInt())).thenReturn(optionalItem);
        final Optional<ItemAggregate> result = service.getItemById(anyInt(), ZonedDateTime.now());

        assertTrue(result.isEmpty());
    }

    @Test
    void getFeaturedItem_ShouldThrowException_WhenItemIsNotFound() {
        when(itemRepository.findFirstByEndTimeGreaterThanEqualOrderByIdAsc(any(ZonedDateTime.class)))
                .thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.getFeaturedItem());
    }

    @Test
    void getFeaturedItem_ShouldThrowException_WhenItemDoesntContainAnyImages() {
        when(itemRepository.findFirstByEndTimeGreaterThanEqualOrderByIdAsc(any(ZonedDateTime.class)))
                .thenReturn(Optional.of(item));

        when(imageRepository.findFirstByItem_IdOrderByIdAsc(anyInt())).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.getFeaturedItem());
    }
}