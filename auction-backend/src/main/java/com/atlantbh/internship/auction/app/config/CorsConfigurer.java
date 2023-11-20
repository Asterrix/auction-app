package com.atlantbh.internship.auction.app.config;

import com.atlantbh.internship.auction.app.builder.CorsConfigurationBuilder;
import com.atlantbh.internship.auction.app.config.constant.AuctionAppProperties;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

import static com.atlantbh.internship.auction.app.builder.CorsConfigurationBuilder.Methods.GET;
import static com.atlantbh.internship.auction.app.builder.CorsConfigurationBuilder.Methods.POST;

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
        buildUserAuthenticationCorsConfiguration();
        return source;
    }

    private void registerCorsConfig(final String path, final CorsConfiguration configuration) {
        source.registerCorsConfiguration(appProperties.getApiVersion() + path, configuration);
    }

    // By default, if the list of allowedMethods is empty, all HTTP methods will be allowed!
    private void buildItemCorsConfiguration() {
        final CorsConfiguration itemsConfig = new CorsConfigurationBuilder()
                .setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()))
                .setAllowedMethods(GET)
                .setAllowedHeaders("*")
                .allowCredentials()
                .build();

        registerCorsConfig("/items/**", itemsConfig);
    }

    private void buildCategoryCorsConfiguration() {
        final CorsConfiguration categoriesConfig = new CorsConfigurationBuilder()
                .setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()))
                .setAllowedMethods(GET)
                .setAllowedHeaders("*")
                .allowCredentials()
                .build();

        registerCorsConfig("/categories", categoriesConfig);
    }

    private void buildUserRegistrationCorsConfiguration() {
        final CorsConfiguration registerConfig = new CorsConfigurationBuilder()
                .setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()))
                .setAllowedMethods(POST)
                .setAllowedHeaders("*")
                .allowCredentials()
                .build();

        registerCorsConfig("/register", registerConfig);
    }

    private void buildUserAuthenticationCorsConfiguration() {
        final CorsConfiguration authConfig = new CorsConfigurationBuilder()
                .setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()))
                .setAllowedMethods(POST)
                .setAllowedHeaders("*")
                .setExposedHeaders("Authorization")
                .allowCredentials()
                .build();

        registerCorsConfig("/authentication/**", authConfig);
    }
}