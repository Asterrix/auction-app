package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Token;
import org.springframework.data.repository.CrudRepository;

public interface TokenRepository extends CrudRepository<Token, Long> {
}