package com.atlantbh.internship.auction.app.mapper;

import java.util.List;

public interface SummaryMapper<E, D> {
    D toDto(E entity);

    List<D> toDto(List<E> entityList);
}
