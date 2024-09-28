package com.atlantbh.internship.auction.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "items_images")
public class ItemImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "image_url", nullable = false, length = 2048)
    private String imageUrl;

    @ManyToOne(optional = false)
    @JoinColumn(name = "item_id", nullable = false)
    @JsonIgnore
    private Item item;

    public ItemImage() {
    }

    public ItemImage(final String imageUrl, final Item item) {
        this.imageUrl = imageUrl;
        this.item = item;
    }

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(final String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(final Item item) {
        this.item = item;
    }

}
