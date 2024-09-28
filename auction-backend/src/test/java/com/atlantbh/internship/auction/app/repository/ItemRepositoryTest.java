package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Item;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Testcontainers
@ActiveProfiles("test")
class ItemRepositoryTest {

    @Container
    private static final PostgreSQLContainer<?> container = new PostgreSQLContainer<>("postgres:latest");
    @Autowired
    private ItemRepository itemRepository;

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", container::getJdbcUrl);
        registry.add("spring.datasource.username", container::getUsername);
        registry.add("spring.datasource.password", container::getPassword);
    }

    @Test
    public void ItemRepository_FindAll_ReturnsListOfItems() {
        Item item1 = new Item(1,
                "Item1",
                "Description",
                new BigDecimal("99.99"),
                LocalDate.of(2023, 10, 20),
                LocalDate.of(2023, 10, 13),
                List.of());

        Item item2 = new Item(
                2,
                "Item2",
                "Car",
                new BigDecimal("7000.00"),
                LocalDate.of(2023, 10, 30),
                LocalDate.of(2023, 11, 7),
                List.of());

        itemRepository.saveAll(List.of(item1, item2));
        List<Item> itemList = itemRepository.findAll();

        Assertions.assertNotNull(itemList);
        Assertions.assertEquals(2, itemList.size());
        Assertions.assertEquals(item1.getId(), itemList.get(0).getId());
        Assertions.assertEquals(item1.getName(), itemList.get(0).getName());
        Assertions.assertNotEquals(item1.getId(), itemList.get(1).getId());
    }

}