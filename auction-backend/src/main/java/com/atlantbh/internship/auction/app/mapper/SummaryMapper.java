package com.atlantbh.internship.auction.app.mapper;

import java.util.List;

public interface SummaryMapper<E, D> {
    D toDto(final E entity);

    List<D> toDto(final List<E> entityList);
}
