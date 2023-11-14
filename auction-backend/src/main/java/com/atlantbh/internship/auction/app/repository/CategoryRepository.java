package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("select c from Category c where c.parentCategory.id is null")
    List<Category> findAllCategories();

    @Query("""
            select c from Category c inner join c.items items
            where c.parentCategory.id is not null and items.endDate >= :endDate
            """)
    List<Category> findAllSubcategories(@Param("endDate") LocalDate endDate);


}