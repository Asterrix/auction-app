package com.atlantbh.internship.auction.app.service.payment_info;

import com.atlantbh.internship.auction.app.entity.PaymentInfo;

public interface PaymentInfoService {
    String findCustomerByUserId(final Integer userId);

    void savePaymentInfo(final PaymentInfo paymentInfo);
}
