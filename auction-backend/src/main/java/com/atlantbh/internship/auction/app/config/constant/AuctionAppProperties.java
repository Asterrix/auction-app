package com.atlantbh.internship.auction.app.config.constant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuctionAppProperties {
    @Value("${app-properties.client-route}")
    private String clientRoute;

    @Value("${app-properties.api-version}")
    private String apiVersion;

    public String getClientRoute() {
        return clientRoute;
    }

    public String getApiVersion() {
        return apiVersion;
    }
}

