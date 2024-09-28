package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    long countByEmail(final String email);
    Optional<User> findFirstByEmailAllIgnoreCase(String email);
}