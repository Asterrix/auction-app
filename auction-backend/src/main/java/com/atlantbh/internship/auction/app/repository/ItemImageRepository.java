package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.projection.ItemImageInfo;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemImageRepository extends ListCrudRepository<ItemImage, Integer> {
    Optional<ItemImageInfo> findFirstByItem_IdOrderByIdAsc(@NonNull Integer id);
}