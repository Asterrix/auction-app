package com.atlantbh.internship.auction.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "payment_info")
public class PaymentInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "customer_id", nullable = false)
    private String customerId;

    public PaymentInfo() {
    }

    public PaymentInfo(final User user, final String customerId) {
        this.user = user;
        this.customerId = customerId;
    }

    public User getUser() {
        return user;
    }

    public String getCustomerId() {
        return customerId;
    }

}