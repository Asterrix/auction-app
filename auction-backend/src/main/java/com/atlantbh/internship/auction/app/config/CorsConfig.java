package com.atlantbh.internship.auction.app.config;

import com.atlantbh.internship.auction.app.config.constant.AuctionAppProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    private final AuctionAppProperties appProperties;

    public CorsConfig(final AuctionAppProperties appProperties) {
        this.appProperties = appProperties;
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(final CorsRegistry registry) {
                registry.addMapping("/api/v1/items")
                        .allowedOrigins(appProperties.getClientRoute())
                        .allowedMethods(HttpMethod.GET.name());

                registry.addMapping("/api/v1/category")
                        .allowedOrigins(appProperties.getClientRoute())
                        .allowedMethods(HttpMethod.GET.name());

                registry.addMapping("/api/v1/items/featured")
                        .allowedOrigins(appProperties.getClientRoute())
                        .allowedMethods(HttpMethod.GET.name());
            }
        };
    }

}
