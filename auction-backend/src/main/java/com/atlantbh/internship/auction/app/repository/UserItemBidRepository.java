package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.UserItemBid;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface UserItemBidRepository extends CrudRepository<UserItemBid, Integer>, JpaSpecificationExecutor<UserItemBid> {
    long countDistinctByItem_Id(Integer id);
}