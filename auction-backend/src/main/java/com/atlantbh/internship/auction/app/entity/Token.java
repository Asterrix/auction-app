package com.atlantbh.internship.auction.app.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "tokens", indexes = {
        @Index(name = "idx_token_token_unq", columnList = "token", unique = true)
})
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "token", nullable = false, unique = true, length = 3000)
    private String token;

    @Column(name = "persistent", nullable = false)
    private Boolean persistent;

    @Column(name = "expiration_time", nullable = false)
    private Instant expirationTime;

    public Token() {
    }

    public Token(final String token, final Boolean persistent, final Instant expirationTime) {
        this.token = token;
        this.persistent = persistent;
        this.expirationTime = expirationTime;
    }

    public String getToken() {
        return token;
    }

    public Instant getExpirationTime() {
        return expirationTime;
    }

    public Boolean getPersistent() {
        return persistent;
    }

}