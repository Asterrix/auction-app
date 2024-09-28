package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByParentCategoryNull();

    List<Category> findByParentCategoryNotNull();
}