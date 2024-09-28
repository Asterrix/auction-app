package com.atlantbh.internship.auction.app.dto;

import java.io.Serializable;

public record ItemImageDto(Integer id, String name, String imageUrl) implements Serializable {
}