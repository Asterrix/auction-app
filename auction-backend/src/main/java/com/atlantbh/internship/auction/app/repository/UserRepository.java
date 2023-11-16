package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}