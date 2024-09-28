package com.atlantbh.internship.auction.app.service.payment_info;

import com.atlantbh.internship.auction.app.entity.PaymentInfo;
import com.atlantbh.internship.auction.app.repository.PaymentInfoRepository;
import org.springframework.stereotype.Component;

@Component
public class PaymentInfoServiceImpl implements PaymentInfoService {
    private final PaymentInfoRepository repository;

    public PaymentInfoServiceImpl(final PaymentInfoRepository repository) {
        this.repository = repository;
    }

    @Override
    public String findCustomerByUserId(final Integer userId) {
        return repository.findByUser_Id(userId)
                .map(PaymentInfo::getCustomerId)
                .orElse("");
    }

    @Override
    public void savePaymentInfo(final PaymentInfo paymentInfo) {
        repository.save(paymentInfo);
    }

}
