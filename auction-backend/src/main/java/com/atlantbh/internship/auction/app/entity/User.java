package com.atlantbh.internship.auction.app.entity;

import com.atlantbh.internship.auction.app.service.validator.order.FirstOrder;
import com.atlantbh.internship.auction.app.service.validator.order.SecondOrder;
import com.atlantbh.internship.auction.app.service.validator.order.ThirdOrder;
import jakarta.persistence.*;
import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@GroupSequence({User.class, FirstOrder.class, SecondOrder.class, ThirdOrder.class})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotBlank(message = "{firstName.blank", groups = FirstOrder.class)
    @Size(message = "{firstName.size}", min = 3, max = 20, groups = SecondOrder.class)
    @Pattern(message = "{firstName.pattern}", regexp = "^[a-zA-Z]+$", groups = ThirdOrder.class)
    @Column(name = "first_name", nullable = false, length = 20)
    private String firstName;

    @NotBlank(message = "{lastName.blank}", groups = FirstOrder.class)
    @Size(message = "{lastName.size}", min = 3, max = 30, groups = SecondOrder.class)
    @Pattern(message = "{lastName.pattern}", regexp = "^[a-zA-Z]+$", groups = ThirdOrder.class)
    @Column(name = "last_name", nullable = false, length = 30)
    private String lastName;

    @NotBlank(message = "{email.blank}", groups = FirstOrder.class)
    @Size(message = "{email.size}", min = 7, max = 40, groups = SecondOrder.class)
    @Column(name = "email", nullable = false, unique = true, length = 40)
    private String email;

    @NotBlank(message = "{password.blank}", groups = FirstOrder.class)
    @Size(message = "{password.size}", min = 8, max = 100, groups = SecondOrder.class)
    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @ManyToOne(optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = false;

    public User() {
    }

    public User(final String firstName,
                final String lastName,
                final String email,
                final String password,
                final Role role,
                final Boolean isActive) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isActive = isActive;
    }

    public Integer getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(final String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(final String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(final LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(final Role role) {
        this.role = role;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(final Boolean active) {
        isActive = active;
    }

}