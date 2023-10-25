package com.atlantbh.internship.auction.app.projection;

import com.atlantbh.internship.auction.app.entity.ItemImage;

/**
 * Projection for {@link ItemImage}
 */
public interface ItemImageInfo {
    Integer getId();

    String getName();

    String getImageUrl();
}