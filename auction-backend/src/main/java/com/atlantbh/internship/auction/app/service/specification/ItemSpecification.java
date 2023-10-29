package com.atlantbh.internship.auction.app.service.specification;


import com.atlantbh.internship.auction.app.entity.Category;
import com.atlantbh.internship.auction.app.entity.Item;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class ItemSpecification {
    public static Specification<Item> isPartOfCategory(final String categoryName) {
        return (root, query, builder) -> {
            query.distinct(true);

            Join<Item, Category> categoryJoin = root.join("category");
            Join<Item, Category> parentCategoryJoin = root.join("category").join("parentCategory", JoinType.LEFT);

            final String normalisedInput = normaliseInput(categoryName);

            Predicate categoryPredicate = builder.equal(builder.lower(categoryJoin.get("name")), normalisedInput);
            Predicate parentCategoryPredicate = builder.equal(builder.lower(parentCategoryJoin.get("name")), normalisedInput);

            return builder.or(categoryPredicate, parentCategoryPredicate);
        };
    }


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

    public static Specification<Item> isNameOf(final String itemName) {
        return (root, query, builder) -> {
            Expression<String> nameExpression = builder.lower(root.get("name"));
            final String normalisedInput = normaliseInput(itemName);
            return builder.and(builder.like(nameExpression, "%" + normalisedInput + "%"));
        };
    }

    public static Specification<Item> isActive() {
        // This is faulty, should be changed in the future to use different time calculating mechanism
        final LocalDate localDate = LocalDate.now();
        return (root, query, builder) -> builder.greaterThan(root.get("endDate"), localDate);
    }

    private static String normaliseInput(final String input) {
        return input.trim().toLowerCase();
    }
}
