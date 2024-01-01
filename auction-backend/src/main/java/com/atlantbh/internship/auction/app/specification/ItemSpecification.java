package com.atlantbh.internship.auction.app.specification;

import com.atlantbh.internship.auction.app.entity.Bid;
import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

public final class ItemSpecification {

    /**
     * Creates a Specification for filtering items based on the specified item name.
     *
     * @param itemName Name used to filter items by.
     * @return {@link Specification} for filtering items based on the provided item name.
     */
    public static Specification<Item> hasName(final String itemName) {
        final String name = itemName.trim().toLowerCase();

        return (root, query, builder) -> builder.like(
                builder.trim(
                        builder.lower(
                                root.get("name")
                        )
                ), "%" + name + "%");
    }

    /**
     * Creates a Specification for filtering items based on the specified subcategory name.
     * Method will validate that subcategory is part of the specified category.
     * This constraint is implemented
     * to prevent the retrieval of items by subcategory in cases where the parent category is unrelated.
     *
     * @param categoryName    Name of the category to filter items by.
     * @param subcategoryName Name of the subcategory to filter items by.
     * @return {@link Specification} for filtering items based on the provided category names.
     */
    public static Specification<Item> hasCategory(final String categoryName, final String subcategoryName) {
        final String category = categoryName.trim().toLowerCase();
        final String subcategory = subcategoryName.trim().toLowerCase();

        return (root, query, builder) -> {
            final Join<Item, Category> categoryJoin = root.join("category");
            final Join<Category, Category> parentCategoryJoin = categoryJoin.join("parentCategory", JoinType.LEFT);

            final Predicate subcategoryParentPredicate = builder.equal(builder.lower(parentCategoryJoin.get("name")), category);
            final Predicate subcategoryPredicate = builder.equal(builder.lower(categoryJoin.get("name")), subcategory);

            return builder.and(subcategoryParentPredicate, subcategoryPredicate);
        };
    }

    /**
     * Creates a Specification for filtering items that are still up for auction and which have not yet been completed by purchase.
     *
     * @return {@link Specification} for filtering items by their auction end date.
     */
    public static Specification<Item> notFinished() {
        return (root, query, builder) -> builder.equal(root.get("finished"), false);
    }

    public static Specification<Item> isActive() {
        return (root, query, builder) -> builder.greaterThan(root.get("endTime"), builder.currentTimestamp());
    }

    public static Specification<Item> endTimeIsNotShorterThan(final ZonedDateTime time) {
        return (root, query, builder) -> builder.greaterThan(root.get("endTime"), time);
    }

    public static Specification<Item> endTimeIsNotOlderThan(final ZonedDateTime time) {
        return (root, query, builder) -> builder.lessThan(root.get("endTime"), time);
    }

    public static Specification<Item> ownerIs(final Integer ownerId) {
        return (root, query, builder) -> builder.equal(root.get("owner").get("id"), ownerId);
    }

    public static Specification<Item> ownerIsNot(final Integer ownerId) {
        return (root, query, builder) -> builder.notEqual(root.get("owner").get("id"), ownerId);
    }

    public static Specification<Item> hasBidder(final Integer userId) {
        return (root, query, builder) -> {
            final Join<Item, Bid> bidJoin = root.join("bids", JoinType.LEFT);
            return builder.equal(bidJoin.get("user").get("id"), userId);
        };
    }

    public static Specification<Item> priceIsBetween(final BigDecimal startingPrice, final BigDecimal endingPrice) {
        return (root, query, builder) -> builder.between(root.get("initialPrice"), startingPrice, endingPrice);
    }

    public static Specification<Item> priceIsBetweenIncludingBids(final BigDecimal startingPrice, final BigDecimal endingPrice) {
        return (root, query, builder) -> {
            final Path<BigDecimal> initialPricePath = root.get("initialPrice");
            final Join<Item, Bid> bidJoin = root.join("bids", JoinType.LEFT);
            final Path<BigDecimal> bidAmountPath = bidJoin.get("amount");

            final Predicate initialPriceInRange = builder.between(initialPricePath, startingPrice, endingPrice);
            final Predicate bidAmountInRange = builder.between(bidAmountPath, startingPrice, endingPrice);

            final Predicate bidAmountNotNull = builder.isNotNull(bidAmountPath);
            final Predicate bidAmountInRangeNonNull = builder.and(bidAmountNotNull, bidAmountInRange);

            return builder.or(initialPriceInRange, bidAmountInRangeNonNull);
        };
    }


    public static Specification<Item> hasLowestInitialPrice() {
        return (root, query, builder) -> {
            final Subquery<BigDecimal> maxInitialPriceSubquery = query.subquery(BigDecimal.class);
            final Root<Item> itemRoot = maxInitialPriceSubquery.from(Item.class);
            maxInitialPriceSubquery.select(builder.min(itemRoot.get("initialPrice")));

            return builder.equal(root.get("initialPrice"), maxInitialPriceSubquery);
        };
    }

    public static Specification<Item> hasLowestBidAmount() {
        return (root, query, builder) -> {
            final Subquery<BigDecimal> maxBidAmountSubquery = query.subquery(BigDecimal.class);
            final Root<Bid> bidRoot = maxBidAmountSubquery.from(Bid.class);
            maxBidAmountSubquery.select(builder.min(bidRoot.get("amount")));

            final Join<Item, Bid> bids = root.join("bids");
            return builder.equal(bids.get("amount"), maxBidAmountSubquery);
        };
    }

    public static Specification<Item> hasHighestInitialPrice() {
        return (root, query, builder) -> {
            final Subquery<BigDecimal> maxInitialPriceSubquery = query.subquery(BigDecimal.class);
            final Root<Item> itemRoot = maxInitialPriceSubquery.from(Item.class);
            maxInitialPriceSubquery.select(builder.max(itemRoot.get("initialPrice")));

            return builder.equal(root.get("initialPrice"), maxInitialPriceSubquery);
        };
    }

    public static Specification<Item> hasHighestBidAmount() {
        return (root, query, builder) -> {
            final Subquery<BigDecimal> maxBidAmountSubquery = query.subquery(BigDecimal.class);
            final Root<Bid> bidRoot = maxBidAmountSubquery.from(Bid.class);
            maxBidAmountSubquery.select(builder.max(bidRoot.get("amount")));

            final Join<Item, Bid> bids = root.join("bids");
            return builder.equal(bids.get("amount"), maxBidAmountSubquery);
        };
    }

    public static Specification<Item> orderByNameAsc() {
        return ItemOrderBySpecification.orderByNameAsc();
    }

    public static Specification<Item> orderByNewest() {
        return ItemOrderBySpecification.orderByNewest();
    }

    public static Specification<Item> orderByTimeLeft() {
        return ItemOrderBySpecification.orderByTimeLeft();
    }

    public static Specification<Item> orderByNumberOfBidsDesc() {
        return ItemOrderBySpecification.orderByNumberOfBidsDesc();
    }

    public static Specification<Item> orderByPriceAsc() {
        return ItemOrderBySpecification.orderByPriceAsc();
    }

    public static Specification<Item> orderByPriceDesc() {
        return ItemOrderBySpecification.orderByPriceDesc();
    }
}
