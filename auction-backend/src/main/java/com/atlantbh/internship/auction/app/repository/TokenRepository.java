package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Token;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends CrudRepository<Token, Long> {
    Optional<Token> findByToken(final String token);

    @Query("select distinct t from Token t where upper(t.user.email) = upper(:email)")
    List<Token> findAllUserTokens(@Param("email") String email);
}