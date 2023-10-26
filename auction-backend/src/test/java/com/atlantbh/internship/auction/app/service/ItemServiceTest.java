package com.atlantbh.internship.auction.app.service;

import com.atlantbh.internship.auction.app.dto.ItemFeaturedDto;
import com.atlantbh.internship.auction.app.dto.ItemSummaryDto;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.projection.ItemImageInfo;
import com.atlantbh.internship.auction.app.projection.ItemInfo;
import com.atlantbh.internship.auction.app.repository.ItemImageRepository;
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
    ItemRepository itemRepository;

    @Mock
    ItemImageRepository imageRepository;

    ItemServiceImpl service;

    @BeforeEach
    void setUp() {
        service = new ItemServiceImpl(itemRepository, imageRepository);
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

        when(itemRepository.findAll(pageRequest)).thenReturn(page);
        Page<ItemSummaryDto> result = service.getAll(pageRequest);

        assertEquals(itemList.size(), result.getTotalElements());
        verify(itemRepository, times(1)).findAll(pageRequest);
    }

    @Test
    void ItemService_GetFeatured_ReturnsItem() {
        final ItemInfo itemInfo = new ItemInfo() {
            @Override
            public Integer getId() {
                return 1;
            }

            @Override
            public String getName() {
                return "Item";
            }

            @Override
            public String getDescription() {
                return "Desc";
            }

            @Override
            public BigDecimal getInitialPrice() {
                return new BigDecimal("92.00");
            }
        };

        final ItemImageInfo itemImageInfo = new ItemImageInfo() {
            @Override
            public Integer getId() {
                return 1;
            }

            @Override
            public String getName() {
                return "Image";
            }

            @Override
            public String getImageUrl() {
                return "ImageUrl";
            }
        };

        when(itemRepository.findFirstByEndDateGreaterThanEqualOrderByIdAsc(LocalDate.now().plusDays(7))).thenReturn(Optional.of(itemInfo));
        when(imageRepository.findFirstByItem_IdOrderByIdAsc(itemInfo.getId())).thenReturn(Optional.of(itemImageInfo));

        ItemFeaturedDto featured = service.getFeatured();

        assertNotNull(featured);
    }

    @Test
    void ItemService_GetFeatured_ThrowsError_WhenItemIsNull() {
        when(itemRepository.findFirstByEndDateGreaterThanEqualOrderByIdAsc(any(LocalDate.class))).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            service.getFeatured();
        });
    }

    @Test
    void ItemService_GetFeatured_ThrowsError_WhenItemImageIsNull() {
        final ItemInfo itemInfo = new ItemInfo() {
            @Override
            public Integer getId() {
                return 1;
            }

            @Override
            public String getName() {
                return "Item";
            }

            @Override
            public String getDescription() {
                return "Desc";
            }

            @Override
            public BigDecimal getInitialPrice() {
                return new BigDecimal("92.00");
            }
        };

        when(itemRepository.findFirstByEndDateGreaterThanEqualOrderByIdAsc(any(LocalDate.class))).thenReturn(Optional.of(itemInfo));

        when(imageRepository.findFirstByItem_IdOrderByIdAsc(anyInt())).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            service.getFeatured();
        });
    }
}