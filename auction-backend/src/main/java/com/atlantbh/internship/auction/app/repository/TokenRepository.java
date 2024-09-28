package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Token;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TokenRepository extends CrudRepository<Token, Long> {
    Optional<Token> findByToken(String token);
}