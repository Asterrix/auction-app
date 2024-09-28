package com.atlantbh.internship.auction.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.TimeZoneStorage;
import org.hibernate.annotations.TimeZoneStorageType;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotBlank(message = "Please provide item name.")
    @Size(message = "Ensure that item name is between {min} and {max} characters in length.", min = 3, max = 50)
    @Pattern(message = "Name can contain letters (both uppercase and lowercase), numbers, " +
            "and the following special characters: ',', '.', '\\\"', '\\'', ' ', ':', ';', '*'.\"",
            regexp = "^[a-zA-Z0-9.,\" ':;*]*$")
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @NotBlank(message = "Please provide item description.")
    @Size(message = "Ensure that item description is between {min} and {max} characters in length.", min = 20, max = 700)
    @Column(name = "description", nullable = false, length = 700)
    private String description;

    @Min(message = "Initial price must be greater than or equal {value}.", value = 1)
    @Digits(message = "Invalid number format. Maximum {integer} digits in total with up to {fraction} decimal places.", integer = 10, fraction = 2)
    @Column(name = "initial_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal initialPrice;

    @Column(name = "start_time", nullable = false)
    @TimeZoneStorage(TimeZoneStorageType.NORMALIZE_UTC)
    private ZonedDateTime startTime;

    @Column(name = "end_time", nullable = false)
    @TimeZoneStorage(TimeZoneStorageType.NORMALIZE_UTC)
    private ZonedDateTime endTime;

    @Size(message = "Item must have a minimum of {min} images and a maximum of {max} images.", min = 3, max = 30)
    @OneToMany(mappedBy = "item", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<ItemImage> itemImages = new ArrayList<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "item", orphanRemoval = true)
    private List<Bid> bids = new ArrayList<>();

    public Item() {
    }

    public Item(final String name,
                final String description,
                final BigDecimal initialPrice,
                final ZonedDateTime startTime,
                final ZonedDateTime endTime,
                final List<ItemImage> itemImages,
                final Category category,
                final User owner) {
        this.name = name;
        this.description = description;
        this.initialPrice = initialPrice;
        this.startTime = startTime;
        this.endTime = endTime;
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

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(final ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(final ZonedDateTime endTime) {
        this.endTime = endTime;
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

    public List<Bid> getUserItemBids() {
        return bids;
    }

    public void setUserItemBids(final List<Bid> bids) {
        this.bids = bids;
    }
}