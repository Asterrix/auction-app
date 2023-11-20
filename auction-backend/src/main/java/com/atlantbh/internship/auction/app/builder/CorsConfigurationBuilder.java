package com.atlantbh.internship.auction.app.builder;

import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

public class CorsConfigurationBuilder {
    private final CorsConfiguration configuration = new CorsConfiguration();

    public CorsConfigurationBuilder setAllowedOrigins(final List<String> origins) {
        configuration.setAllowedOrigins(origins);
        return this;
    }

    public CorsConfigurationBuilder setAllowedMethods(final String... allowedMethods) {
        configuration.setAllowedMethods(List.of(allowedMethods));
        return this;
    }

    public CorsConfigurationBuilder setAllowedHeaders(final String... allowedHeaders) {
        configuration.setAllowedHeaders(List.of(allowedHeaders));
        return this;
    }

    public CorsConfigurationBuilder setExposedHeaders(final String... exposedHeaders) {
        configuration.setExposedHeaders(List.of(exposedHeaders));
        return this;
    }

    public CorsConfigurationBuilder allowCredentials() {
        configuration.setAllowCredentials(true);
        return this;
    }

    public CorsConfiguration build() {
        return configuration;
    }

    public static class Methods {
        public static final String GET = HttpMethod.GET.name();
        public static final String POST = HttpMethod.POST.name();
        public static final String PATCH = HttpMethod.PATCH.name();
        public static final String PUT = HttpMethod.PUT.name();
        public static final String DELETE = HttpMethod.DELETE.name();
    }
}

