package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.item.ItemDto;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.repository.ItemImageRepository;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
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

    private ItemServiceImpl service;

    @BeforeEach
    void setUp() {
        service = new ItemServiceImpl(itemRepository, imageRepository);
    }

    @Test
    void getItemById_ShouldReturnItem() {
        final Item item = new Item(
                1,
                "Item1",
                "Desc",
                new BigDecimal("40.00"),
                LocalDate.MIN,
                LocalDate.MAX,
                List.of(),
                new Category()
        );
        final Optional<Item> optionalItem = Optional.of(item);

        when(itemRepository.findById(anyInt())).thenReturn(optionalItem);
        final Optional<ItemDto> result = service.getItemById(anyInt());

        assertTrue(result.isPresent());
    }

    @Test
    void getItemById_ShouldReturnEmptyOptional() {
        final Optional<Item> optionalItem = Optional.empty();

        when(itemRepository.findById(anyInt())).thenReturn(optionalItem);
        final Optional<ItemDto> result = service.getItemById(anyInt());

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
        final Item item = new Item(
                1,
                "Item1",
                "Desc",
                BigDecimal.ZERO,
                LocalDate.MIN,
                LocalDate.MAX,
                List.of(),
                new Category()
        );

        when(itemRepository.findFirstByEndDateGreaterThanEqualOrderByIdAsc(any(LocalDate.class)))
                .thenReturn(Optional.of(item));

        when(imageRepository.findFirstByItem_IdOrderByIdAsc(anyInt())).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.getFeaturedItem());
    }
}