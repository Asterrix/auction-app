package com.atlantbh.internship.auction.app.service.specification;

import com.atlantbh.internship.auction.app.entity.Bid;
import com.atlantbh.internship.auction.app.entity.Item;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

enum PriceOrder {
    ASCENDING,
    DESCENDING
}

public final class ItemOrderBySpecification {
    public static Specification<Item> orderByNameAsc() {
        return (root, query, builder) -> {
            query.orderBy(builder.asc(root.get("name")));
            return builder.conjunction();
        };
    }

    public static Specification<Item> orderByNewest() {
        return (root, query, builder) -> {
            query.orderBy(builder.asc(root.get("startTime")));
            return builder.conjunction();
        };
    }

    public static Specification<Item> orderByTimeLeft() {
        return (root, query, builder) -> {
            query.orderBy(builder.asc(root.get("endTime")));
            return builder.conjunction();
        };
    }

    public static Specification<Item> orderByNumberOfBidsDesc() {
        return (root, query, builder) -> query.orderBy(
                builder.desc(
                        builder.size(
                                root.get("bids")
                        )
                )
        ).getRestriction();
    }

    public static Specification<Item> orderByPriceAsc() {
        return createOrderByPriceSpecification(PriceOrder.ASCENDING);
    }

    public static Specification<Item> orderByPriceDesc() {
        return createOrderByPriceSpecification(PriceOrder.DESCENDING);
    }

    private static Specification<Item> createOrderByPriceSpecification(final PriceOrder priceOrder) {
        return (root, query, builder) -> {
            final Subquery<BigDecimal> highestBidSubquery = query.subquery(BigDecimal.class);
            highestBidSubquery.from(Bid.class);
            highestBidSubquery.select(builder.max(root.get("bids").get("amount")));

            final Expression<BigDecimal> caseExpression = builder.coalesce(
                    highestBidSubquery,
                    root.get("initialPrice")
            );

            switch (priceOrder) {
                case ASCENDING -> query.orderBy(builder.asc(caseExpression));
                case DESCENDING -> query.orderBy(builder.desc(caseExpression));
            }

            return builder.conjunction();
        };
    }
}
