package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer>, JpaSpecificationExecutor<Item> {
    Optional<Item> findFirstByEndTimeGreaterThanEqualOrderByIdAsc(final ZonedDateTime endTime);

    List<Item> findByOwner_Id(final Integer ownerId);
}