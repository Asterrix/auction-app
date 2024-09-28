package com.atlantbh.internship.auction.app.config;

import com.atlantbh.internship.auction.app.config.constant.AuctionAppProperties;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

public class CorsConfigurer {
    private final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

    private final AuctionAppProperties appProperties;

    public CorsConfigurer(final AuctionAppProperties appProperties) {
        this.appProperties = appProperties;
    }

    public CorsConfigurationSource initAllCorsConfigurations() {
        buildItemCorsConfiguration();
        buildCategoryCorsConfiguration();
        buildUserRegistrationCorsConfiguration();
        return source;
    }

    // By default, if the list of allowedMethods is empty, all HTTP methods will be allowed!
    private void buildCorsConfiguration(final String path, final List<String> allowedMethods) {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()));
        configuration.setAllowedMethods(allowedMethods);
        source.registerCorsConfiguration(appProperties.getApiVersion() + path, configuration);
    }

    private void buildItemCorsConfiguration() {
        buildCorsConfiguration("/items", List.of(HttpMethod.GET.name()));
        buildCorsConfiguration("/items/{id}", List.of(HttpMethod.GET.name()));
        buildCorsConfiguration("/items/featured", List.of(HttpMethod.GET.name()));
    }

    private void buildCategoryCorsConfiguration() {
        buildCorsConfiguration("/categories", List.of(HttpMethod.GET.name()));
    }

    private void buildUserRegistrationCorsConfiguration() {
        buildCorsConfiguration("/register", List.of(HttpMethod.POST.name()));
    }
}