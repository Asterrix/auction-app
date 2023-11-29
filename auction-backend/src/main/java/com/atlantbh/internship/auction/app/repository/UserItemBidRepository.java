package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.UserItemBid;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;

public interface UserItemBidRepository extends CrudRepository<UserItemBid, Integer>, JpaSpecificationExecutor<UserItemBid> {
    long countDistinctByItem_Id(Integer id);

    List<UserItemBid> findDistinctByItem_IdOrderByAmountDesc(Integer id);

    List<UserItemBid> findByUser_Id(Integer id);

    @Query("select distinct u from UserItemBid u where u.item.id = ?1 order by u.amount DESC")
    List<UserItemBid> listOfHighestBids(Integer id);
}