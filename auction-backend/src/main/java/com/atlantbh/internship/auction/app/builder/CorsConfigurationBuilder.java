package com.atlantbh.internship.auction.app.builder;

import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;

import java.util.ArrayList;
import java.util.List;

public class CorsConfigurationBuilder {
    private final CorsConfiguration configuration = new CorsConfiguration();

    public CorsConfigurationBuilder setAllowedOrigins(final List<String> origins) {
        configuration.setAllowedOrigins(origins);
        return this;
    }

    public CorsConfigurationBuilder setAllowedMethods(final List<HttpMethod> allowedMethods) {
        List<String> methodList = new ArrayList<>(allowedMethods.size());
        allowedMethods.forEach(method -> methodList.add(method.toString()));
        configuration.setAllowedMethods(methodList);
        return this;
    }

    public CorsConfigurationBuilder setAllowedHeaders(final List<String> allowedHeaders) {
        configuration.setAllowedHeaders(allowedHeaders);
        return this;
    }

    public CorsConfigurationBuilder setExposedHeaders(final List<String> exposedHeaders) {
        configuration.setExposedHeaders(exposedHeaders);
        return this;
    }

    public CorsConfiguration build() {
        return configuration;
    }
}

