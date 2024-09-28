package com.atlantbh.internship.auction.app.dto.category;

import com.atlantbh.internship.auction.app.entity.Category;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link Category}
 */
public record CategoryDto(
        Integer id,
        String name,
        List<SubcategoryDto> subcategories
) implements Serializable {
}