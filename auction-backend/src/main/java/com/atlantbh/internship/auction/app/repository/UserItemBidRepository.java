package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.entity.UserItemBid;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserItemBidRepository extends CrudRepository<UserItemBid, Integer>, JpaSpecificationExecutor<UserItemBid> {
    @Query("select count(distinct u) from UserItemBid u where u.item.id = ?1")
    long getTotalCount(Integer id);

}