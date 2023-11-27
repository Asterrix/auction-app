package com.atlantbh.internship.auction.app.config.constant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;

@Configuration
public class TokenProperties {

    @Value("${token.issuer}")
    private String issuer;

    @Value("${token.expiration.regular}")
    private Byte regularExpiration;

    @Value("${token.expiration.persistent}")
    private Byte persistentExpiration;

    @Value("${token.temporal-unit}")
    private String temporalUnit;

    public String getIssuer() {
        return issuer;
    }

    public Byte getRegularExpiration() {
        return regularExpiration;
    }

    public Byte getPersistentExpiration() {
        return persistentExpiration;
    }

    public TemporalUnit getTemporalUnit() {
        return ChronoUnit.valueOf(temporalUnit);
    }

}
