package com.atlantbh.internship.auction.app.builder;

import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.entity.User;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class ItemBuilder {
    private String name;
    private String description;
    private BigDecimal initialPrice;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<ItemImage> itemImages;
    private Category category;
    private User owner;

    public ItemBuilder setName(final String name) {
        this.name = name;
        return this;
    }

    public ItemBuilder setDescription(final String description) {
        this.description = description;
        return this;
    }

    public ItemBuilder setInitialPrice(final BigDecimal initialPrice) {
        this.initialPrice = initialPrice;
        return this;
    }

    public ItemBuilder setStartDate(final LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public ItemBuilder setEndDate(final LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public ItemBuilder setItemImages(final List<ItemImage> itemImages) {
        this.itemImages = itemImages;
        return this;
    }

    public ItemBuilder setCategory(final Category category) {
        this.category = category;
        return this;
    }

    public ItemBuilder setOwner(final User owner) {
        this.owner = owner;
        return this;
    }

    public Item build() {
        return new Item(name, description, initialPrice, startDate, endDate, itemImages, category, owner);
    }
}