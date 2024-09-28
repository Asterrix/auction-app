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

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "persistent", nullable = false)
    private Boolean persistent;

    @Column(name = "expiration_time", nullable = false)
    private Instant expirationTime;

    public User getUser() {
        return user;
    }

    public Token() {
    }

    public Token(final String token, final User user, final Boolean persistent, final Instant expirationTime) {
        this.token = token;
        this.user = user;
        this.persistent = persistent;
        this.expirationTime = expirationTime;
    }

    public String getToken() {
        return token;
    }

    public Instant getExpirationTime() {
        return expirationTime;
    }

}