package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.projection.ItemInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Query("select f.id as id, f.name as name, f.description as description, f.initialPrice as initialPrice from Item f where f.id = :itemId")
    Optional<ItemInfo> getFeaturedItem(@Param("itemId") Integer itemId);
}