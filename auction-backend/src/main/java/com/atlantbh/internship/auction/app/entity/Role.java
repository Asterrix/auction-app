package com.atlantbh.internship.auction.app.entity;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "role", nullable = false, unique = true, length = 30)
    private String role;

    @OneToMany(mappedBy = "role", orphanRemoval = true)
    private Set<User> users = new HashSet<>();


    public Role() {
    }

    @Override
    public String getAuthority() {
        return role;
    }

}