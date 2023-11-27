package com.atlantbh.internship.auction.app.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "description", nullable = false, length = 700)
    private String description;

    @Column(name = "initial_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal initialPrice;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @OneToMany(mappedBy = "item", orphanRemoval = true)
    private List<ItemImage> itemImages = new ArrayList<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "item", orphanRemoval = true)
    private List<UserItemBid> userItemBids = new ArrayList<>();


    public Item() {
    }

    public Item(final String name,
                final String description,
                final BigDecimal initialPrice,
                final LocalDate startDate,
                final LocalDate endDate,
                final List<ItemImage> itemImages,
                final Category category,
                final User owner) {
        this.name = name;
        this.description = description;
        this.initialPrice = initialPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.itemImages = itemImages;
        this.category = category;
        this.owner = owner;
    }

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public BigDecimal getInitialPrice() {
        return initialPrice;
    }

    public void setInitialPrice(final BigDecimal initialPrice) {
        this.initialPrice = initialPrice;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(final LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(final LocalDate endDate) {
        this.endDate = endDate;
    }

    public List<ItemImage> getItemImages() {
        return itemImages;
    }

    public void setItemImages(final List<ItemImage> itemImages) {
        this.itemImages = itemImages;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(final Category category) {
        this.category = category;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(final User owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "name = " + name + ", " +
                "description = " + description + ", " +
                "initialPrice = " + initialPrice + ", " +
                "startDate = " + startDate + ", " +
                "endDate = " + endDate + ", " +
                "category = " + category + ", " +
                "owner = " + owner + ")";
    }
}