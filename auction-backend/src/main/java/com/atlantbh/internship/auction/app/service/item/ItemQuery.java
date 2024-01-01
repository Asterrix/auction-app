package com.atlantbh.internship.auction.app.service.item;

import com.atlantbh.internship.auction.app.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface ItemQuery {
    Optional<Item> findOne(final Specification<Item> specification);
    Page<Item> findAll(final Specification<Item> specification, final Pageable pageable);

    List<Item> findAll(final Specification<Item> specification);
}
