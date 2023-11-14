package com.atlantbh.internship.auction.app.service.specification;


import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;


/**
 * Creates custom Item specifications to be passed to the JPA findAll() method
 */
public final class ItemSpecification {

    /**
     * Creates a Specification for filtering items based on the specified category name.
     *
     * @param categoryName Name of the category to filter items by.
     * @return {@link Specification} for filtering items based on the provided category name.
     */
    public static Specification<Item> isPartOfCategory(final String categoryName) {
        return (root, query, builder) -> {
            query.distinct(true);

            // Join the Item entity with the Category and its Subcategory
            Join<Item, Category> categoryJoin = root.join("category");
            Join<Item, Category> parentCategoryJoin = root.join("category").join("parentCategory", JoinType.LEFT);

            final String normalisedInput = normaliseInput(categoryName);

            Predicate categoryPredicate = builder.equal(builder.lower(categoryJoin.get("name")), normalisedInput);
            Predicate parentCategoryPredicate = builder.equal(builder.lower(parentCategoryJoin.get("name")), normalisedInput);

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
    public static Specification<Item> isPartOfSubcategory(final String categoryName, final String subcategoryName) {
        return (root, query, builder) -> {
            query.distinct(true);

            Join<Item, Category> categoryJoin = root.join("category");
            Join<Category, Category> parentCategoryJoin = categoryJoin.join("parentCategory", JoinType.LEFT);

            Predicate subcategoryParentPredicate = builder.equal(builder.lower(parentCategoryJoin.get("name")), normaliseInput(categoryName));
            Predicate subcategoryPredicate = builder.equal(builder.lower(categoryJoin.get("name")), normaliseInput(subcategoryName));

            return builder.and(subcategoryParentPredicate, subcategoryPredicate);
        };
    }

    /**
     * Creates a Specification for filtering items based on the specified item name.
     *
     * @param itemName Name used to filter items by.
     * @return {@link Specification} for filtering items based on the provided item name.
     */
    public static Specification<Item> isNameOf(final String itemName) {
        return (root, query, builder) -> {
            Expression<String> nameExpression = builder.lower(root.get("name"));
            final String normalisedInput = normaliseInput(itemName);
            return builder.and(builder.like(nameExpression, "%" + normalisedInput + "%"));
        };
    }

    /**
     * Creates a Specification for filtering items that are still up for auction.
     *
     * @return {@link Specification} for filtering items by their auction end date.
     */
    public static Specification<Item> isActive() {
        // This is faulty, should be changed in the future to use different time-calculating mechanism
        final LocalDate localDate = LocalDate.now();
        return (root, query, builder) -> builder.greaterThan(root.get("endDate"), localDate);
    }

    private static String normaliseInput(final String input) {
        return input.trim().toLowerCase();
    }
}
