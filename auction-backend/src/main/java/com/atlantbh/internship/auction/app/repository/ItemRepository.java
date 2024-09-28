package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.projection.ItemInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Query(value = "SELECT f.id as id, f.name as name, f.description as description, f.initial_price as InitialPrice " +
            "from items as f where f.id is not null and f.end_date > ? limit 1", nativeQuery = true)
    Optional<ItemInfo> getFeaturedItem(@Param("endDate") LocalDate endDate);
}