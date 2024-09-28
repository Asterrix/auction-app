package com.atlantbh.internship.auction.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    public User() {
    }

    public Integer getId() {
        return id;
    }

}