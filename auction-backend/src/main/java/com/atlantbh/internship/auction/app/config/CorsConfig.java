package com.atlantbh.internship.auction.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.atlantbh.internship.auction.app.config.constant.RouteConstant.CLIENT_ROUTE;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(final CorsRegistry registry) {
                registry.addMapping("/api/v1/items")
                        .allowedOrigins(CLIENT_ROUTE)
                        .allowedMethods(HttpMethod.GET.name());

                registry.addMapping("/api/v1/category")
                        .allowedOrigins(CLIENT_ROUTE)
                        .allowedMethods(HttpMethod.GET.name());
            }
        };
    }

}
