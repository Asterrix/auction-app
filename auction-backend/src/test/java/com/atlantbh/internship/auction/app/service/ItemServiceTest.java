package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.dto.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.service.impl.ItemServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ItemServiceTest {

    @Mock
    ItemRepository repository;

    ItemServiceImpl service;

    @BeforeEach
    void setUp() {
        this.service = new ItemServiceImpl(repository);
    }

    @Test
    void ItemService_GetAll_ReturnsListOfItems() {
        List<Item> itemList = List.of(
                new Item(1, "Item1", "Desc1", new BigDecimal("100.00"), LocalDate.EPOCH, LocalDate.EPOCH, List.of()),
                new Item(2, "Item2", "Desc2", new BigDecimal("999.00"), LocalDate.EPOCH, LocalDate.EPOCH, List.of()),
                new Item(3, "Item3", "Desc3", new BigDecimal("1999.99"), LocalDate.EPOCH, LocalDate.EPOCH, List.of())
        );

        Page<Item> page = new PageImpl<>(itemList);
        Pageable pageRequest = PageRequest.of(0, 3);

        when(repository.findAll(pageRequest)).thenReturn(page);
        Page<ItemSummaryDto> result = service.getAll(pageRequest);

        assertEquals(itemList.size(), result.getTotalElements());
        verify(repository, times(1)).findAll(pageRequest);
    }

    @Test
    void ItemService_GetFeatured_ReturnsItem() {
        Item item = new Item(1, "Item1", "Desc1", new BigDecimal("100.00"), LocalDate.EPOCH, LocalDate.EPOCH, List.of());

        when(repository.findById(1)).thenReturn(Optional.of(item));

        ItemFeaturedDto featured = service.getFeatured();

        assertNotNull(featured);
    }

    @Test
    void ItemService_GetFeatured_ThrowsError() {
        when(repository.findById(1)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            service.getFeatured();
        });
    }
}