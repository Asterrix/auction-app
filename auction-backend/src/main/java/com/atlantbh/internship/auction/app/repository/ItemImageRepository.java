package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.ItemImage;
import com.atlantbh.internship.auction.app.projection.ItemImageInfo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemImageRepository extends ListCrudRepository<ItemImage, Integer> {
    @Query(value = "SELECT i.id as id, i.name as name, i.image_url as imageUrl FROM items_images i WHERE i.item_id = :itemId " +
            "order by i.id asc LIMIT 1", nativeQuery = true)
    Optional<ItemImageInfo> getFeaturedItemImage(@Param("itemId") Integer itemId);
}