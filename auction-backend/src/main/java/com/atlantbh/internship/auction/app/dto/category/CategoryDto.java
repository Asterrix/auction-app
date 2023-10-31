package com.atlantbh.internship.auction.app.dto.category;

import com.atlantbh.internship.auction.app.entity.Category;

import java.io.Serializable;

/**
 * DTO for {@link Category}
 */
public record CategoryDto(Integer id, String name) implements Serializable {
}