package com.atlantbh.internship.auction.app.dto.category;

import com.atlantbh.internship.auction.app.entity.Category;

import java.io.Serializable;

/**
 * DTO for {@link Category}
 */
public record SubcategoryDto(
        Integer id,
        String name,
        Integer numberOfItems
) implements Serializable {
}
