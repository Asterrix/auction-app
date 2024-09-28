package com.atlantbh.internship.auction.app.repository;

import com.atlantbh.internship.auction.app.entity.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Integer> {
    Optional<PaymentInfo> findByUser_Id(final Integer userId);
}