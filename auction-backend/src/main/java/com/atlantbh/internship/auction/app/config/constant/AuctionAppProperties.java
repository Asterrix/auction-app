package com.atlantbh.internship.auction.app.config.constant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AuctionAppProperties {
    @Value("${app-properties.client-route}")
    private String clientRoute;

    public String getClientRoute() {
        return clientRoute;
    }
}

