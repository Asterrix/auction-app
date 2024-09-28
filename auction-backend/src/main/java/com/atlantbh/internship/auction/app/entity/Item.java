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

    public Item() {
    }

    public Item(final Integer id,
                final String name,
                final String description,
                final BigDecimal initialPrice,
                final LocalDate startDate,
                final LocalDate endDate,
                final List<ItemImage> itemImages) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.initialPrice = initialPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.itemImages = itemImages;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getInitialPrice() {
        return initialPrice;
    }

    public List<ItemImage> getItemImages() {
        return itemImages;
    }

}