package com.atlantbh.internship.auction.app.mapper;

import java.util.List;

public interface Mapper<E, D> {
    E toEntity(final D dto);

    D toDto(final E entity);

    List<E> toEntity(final List<D> dtoList);

    List<D> toDto(final List<E> entityList);
}
