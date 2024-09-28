package com.atlantbh.internship.auction.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @NotBlank(message = "Please provide a first name.")
    @Size(message = "Ensure that first name is between {min} and {max} characters in length.", min = 3, max = 20)
    @Pattern(message = "The first name should only contain alphabetical characters.", regexp = "^[a-zA-Z]+$")
    @Column(name = "first_name", nullable = false, length = 20)
    private String firstName;
    @NotBlank(message = "Please provide a last name.")
    @Size(message = "Ensure that last name is between {min} and {max} characters in length.", min = 3, max = 30)
    @Pattern(message = "The last name should only contain alphabetical characters.", regexp = "^[a-zA-Z]+$")
    @Column(name = "last_name", nullable = false, length = 30)
    private String lastName;
    @NotBlank(message = "Please provide an email address.")
    @Size(message = "Email must be between {min} and {max} characters in length.", min = 7, max = 40)
    @Column(name = "email", nullable = false, unique = true, length = 40)
    private String email;
    @NotBlank(message = "Please provide a password.")
    @Size(message = "Ensure that password is between {min} and {max} characters in length.", min = 8, max = 100)
    @Column(name = "password", nullable = false, length = 100)
    private String password;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    @ManyToOne(optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = false;

    @OneToMany(mappedBy = "owner")
    private final List<Item> items = new ArrayList<>();

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<PaymentInfo> paymentInfo = new ArrayList<>();

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

    public void setId(final Integer id) {
        this.id = id;
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

    public List<Item> getItems() {
        return items;
    }

    public List<PaymentInfo> getPaymentInfo() {
        return paymentInfo;
    }

    public void setPaymentInfo(List<PaymentInfo> paymentInfo) {
        this.paymentInfo = paymentInfo;
    }

}