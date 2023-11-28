package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer>, JpaSpecificationExecutor<Item> {
    Optional<Item> findFirstByEndTimeGreaterThanEqualOrderByIdAsc(LocalDateTime endTime);

    Optional<Item> findByIdAndEndTimeGreaterThan(Integer id, LocalDateTime endTime);
}