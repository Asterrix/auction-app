package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Bid;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BidRepository extends CrudRepository<Bid, Integer>, JpaSpecificationExecutor<Bid> {
    long countDistinctByItem_Id(final Integer id);

    @Query("""
                select u
                from Bid u
                where u.user.id = ?1
                and u.amount = (
                    select max(uib.amount)
                    from Bid uib
                    where uib.user.id = ?1
                    and uib.item.id = u.item.id
                )
                order by u.id DESC
            """)
    List<Bid> findAllUserRelatedBids(final Integer userId);
}