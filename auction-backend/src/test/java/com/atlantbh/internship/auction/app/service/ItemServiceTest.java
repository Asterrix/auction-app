package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.aggregate.ItemAggregate;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.builder.ItemBuilder;
import com.atlantbh.internship.auction.app.entity.User;
import com.atlantbh.internship.auction.app.repository.ItemImageRepository;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.repository.UserItemBidRepository;
import com.atlantbh.internship.auction.app.service.impl.ItemServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
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
    private UserItemBidRepository itemBidRepository;

    private ItemServiceImpl service;

    @BeforeEach
    void setUp() {
        service = new ItemServiceImpl(itemRepository, imageRepository, itemBidRepository);
    }

    @Test
    void getItemById_ShouldReturnItem() {
        final Item item = new ItemBuilder()
                .setName("Item1")
                .setDescription("Desc")
                .setInitialPrice(new BigDecimal("40.00"))
                .setStartDate(LocalDate.MIN)
                .setEndDate(LocalDate.MAX)
                .setItemImages(List.of())
                .setCategory(new Category())
                .setOwner(new User())
                .build();

        item.setId(1);
        final Optional<Item> optionalItem = Optional.of(item);

        when(itemRepository.findById(anyInt())).thenReturn(optionalItem);
        final Optional<ItemAggregate> result = service.getItemById(anyInt());

        assertTrue(result.isPresent());
    }

    @Test
    void getItemById_ShouldReturnEmptyOptional() {
        final Optional<Item> optionalItem = Optional.empty();

        when(itemRepository.findById(anyInt())).thenReturn(optionalItem);
        final Optional<ItemAggregate> result = service.getItemById(anyInt());

        assertTrue(result.isEmpty());
    }

    @Test
    void getFeaturedItem_ShouldThrowException_WhenItemIsNotFound() {
        when(itemRepository.findFirstByEndDateGreaterThanEqualOrderByIdAsc(any(LocalDate.class)))
                .thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.getFeaturedItem());
    }

    @Test
    void getFeaturedItem_ShouldThrowException_WhenItemDoesntContainAnyImages() {
        final Item item = new ItemBuilder().setName("Item1").setDescription("Desc").setInitialPrice(BigDecimal.ZERO).setStartDate(LocalDate.MIN).setEndDate(LocalDate.MAX).setItemImages(List.of()).setCategory(new Category()).setOwner(new User()).build();
        item.setId(1);

        when(itemRepository.findFirstByEndDateGreaterThanEqualOrderByIdAsc(any(LocalDate.class)))
                .thenReturn(Optional.of(item));

        when(imageRepository.findFirstByItem_IdOrderByIdAsc(anyInt())).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.getFeaturedItem());
    }
}