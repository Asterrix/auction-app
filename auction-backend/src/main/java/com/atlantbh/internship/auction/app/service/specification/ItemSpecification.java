package com.atlantbh.internship.auction.app.service.specification;

import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

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
     * Creates a Specification for filtering items based on the specified category name.
     *
     * @param categoryName Name of the category to filter items by.
     * @return {@link Specification} for filtering items based on the provided category name.
     */
    public static Specification<Item> hasCategory(final String categoryName) {
        final String category = categoryName.trim().toLowerCase();

        return (root, query, builder) -> {
            final Join<Item, Category> categoryJoin = root.join("category");
            final Join<Item, Category> parentCategoryJoin = root.join("category").join("parentCategory", JoinType.LEFT);

            final Predicate categoryPredicate = builder.equal(builder.lower(categoryJoin.get("name")), category);
            final Predicate parentCategoryPredicate = builder.equal(builder.lower(parentCategoryJoin.get("name")), category);

            return builder.or(categoryPredicate, parentCategoryPredicate);
        };
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
    public static Specification<Item> hasSubcategory(final String categoryName, final String subcategoryName) {
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

    public static Specification<Item> orderByNameAsc() {
        return ItemOrderBySpecification.orderByNameAsc();
    }

    public static Specification<Item> orderByNewest() {
        return ItemOrderBySpecification.orderByNewest();
    }

    public static Specification<Item> orderByTimeLeft() {
        return ItemOrderBySpecification.orderByTimeLeft();
    }

    public static Specification<Item> orderByPriceAsc() {
        return ItemOrderBySpecification.orderByPriceAsc();
    }

    public static Specification<Item> orderByPriceDesc() {
        return ItemOrderBySpecification.orderByPriceDesc();
    }
}
