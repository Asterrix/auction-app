package com.atlantbh.internship.auction.app.service.provider;

import com.atlantbh.internship.auction.app.entity.Role;
import com.atlantbh.internship.auction.app.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

public class UserAuthentication implements Authentication {
    private final Integer id;
    private final String email;
    private final String firstName;
    private final String lastName;
    private final Role role;

    private UserAuthentication(final Integer id, final String email, final String firstName, final String lastName, final Role role) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    public static UserAuthentication authenticated(final User user) {
        return new UserAuthentication(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(role);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return email;
    }

    @Override
    public boolean isAuthenticated() {
        return true;
    }

    @Override
    public void setAuthenticated(final boolean isAuthenticated) throws IllegalArgumentException {
        throw new IllegalArgumentException("This method should never be invoked!");
    }

    @Override
    public String getName() {
        return firstName + " " + lastName;
    }

    public HashMap<String, Object> getClaims() {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("id", id);
        claims.put("firstName", firstName);
        claims.put("lastName", lastName);
        claims.put("role", role.getAuthority());
        return claims;
    }
}
