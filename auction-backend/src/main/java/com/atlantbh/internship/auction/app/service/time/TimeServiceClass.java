package com.atlantbh.internship.auction.app.service.time;

import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
public class TimeServiceClass implements TimeService {

    @Override
    public ZonedDateTime getCurrentZonedDateTime() {
        return ZonedDateTime.now();
    }

}
