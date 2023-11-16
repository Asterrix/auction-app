package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role, Integer> {
    Optional<Role> findByRoleAllIgnoreCase(String role);
}