package com.atlantbh.internship.auction.app.service.specification;

import com.atlantbh.internship.auction.app.entity.Bid;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class UserItemBidSpecification {

    public static Specification<Bid> isHighestBid(Integer itemId){
        return (root, query, builder) -> {
            query.distinct(true);

            // Sub query to find the highest bid amount for the specified item
            Subquery<BigDecimal> subquery = query.subquery(BigDecimal.class);
            Root<Bid> subqueryRoot = subquery.from(Bid.class);
            subquery.select(builder.max(subqueryRoot.get("amount")));
            subquery.where(builder.equal(subqueryRoot.get("item"), root.get("item")));

            // Main query to find bids matching the highest bid amount
            Predicate item = builder.equal(root.get("item").get("id"), itemId);
            Predicate highestBid = builder.equal(root.get("amount"), subquery);

            return builder.and(item, highestBid);
        };
    }
}
