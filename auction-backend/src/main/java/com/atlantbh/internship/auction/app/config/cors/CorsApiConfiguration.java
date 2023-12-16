package com.atlantbh.internship.auction.app.config.cors;

import com.atlantbh.internship.auction.app.builder.CorsConfigurationBuilder;
import com.atlantbh.internship.auction.app.config.constant.AuctionAppProperties;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION; // Currently the only allowed header besides "*"

public class CorsApiConfiguration {
    private final AuctionAppProperties appProperties;
    private final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

    public CorsApiConfiguration(final AuctionAppProperties appProperties) {
        this.appProperties = appProperties;
    }

    // Initialise all configurations
    public UrlBasedCorsConfigurationSource corsConfiguration() {
        itemCorsConfig();
        categoryCorsConfig();
        registrationCorsConfig();
        authenticationCorsConfig();
        biddingCorsConfig();
        userItemsCorsConfig();
        stripeCorsConfig();
        return source;
    }

    private void registerCorsConfig(final String path, final CorsConfiguration configuration) {
        final String clientRoute = appProperties.getApiVersion();
        final String finalPath = clientRoute + path;
        source.registerCorsConfiguration(finalPath, configuration);
    }

    private void itemCorsConfig() {
        final CorsConfiguration itemsConfig = new CorsConfigurationBuilder()
                .setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()))
                .setAllowedMethods(List.of(HttpMethod.GET, HttpMethod.POST))
                .setAllowedHeaders(List.of("*"))
                .build();

        registerCorsConfig("/items/**", itemsConfig);
    }

    private void categoryCorsConfig() {
        final CorsConfiguration categoryConfig = new CorsConfigurationBuilder()
                .setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()))
                .setAllowedMethods(List.of(HttpMethod.GET))
                .setAllowedHeaders(List.of(AUTHORIZATION))
                .build();

        registerCorsConfig("/categories", categoryConfig);
    }

    private void registrationCorsConfig() {
        final CorsConfiguration registerConfig = new CorsConfigurationBuilder()
                .setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()))
                .setAllowedMethods(List.of(HttpMethod.POST))
                .setAllowedHeaders(List.of("*"))
                .build();

        registerCorsConfig("/register", registerConfig);
    }

    private void authenticationCorsConfig() {
        final CorsConfiguration authConfig = new CorsConfigurationBuilder()
                .setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()))
                .setAllowedMethods(List.of(HttpMethod.POST))
                .setAllowedHeaders(List.of("*"))
                .setExposedHeaders(List.of(AUTHORIZATION))
                .build();

        registerCorsConfig("/authentication", authConfig);

        final CorsConfiguration logoutConfig = new CorsConfigurationBuilder()
                .setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()))
                .setAllowedMethods(List.of(HttpMethod.POST))
                .setAllowedHeaders(List.of(AUTHORIZATION))
                .build();

        registerCorsConfig("/authentication/logout", logoutConfig);
    }

    private void biddingCorsConfig() {
        final CorsConfiguration bidConfig = new CorsConfigurationBuilder()
                .setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()))
                .setAllowedMethods(List.of(HttpMethod.GET, HttpMethod.POST))
                .setAllowedHeaders(List.of("*"))
                .build();

        registerCorsConfig("/bids", bidConfig);
    }

    private void userItemsCorsConfig(){
        final CorsConfiguration userItemsConfig = new CorsConfigurationBuilder()
                .setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()))
                .setAllowedMethods(List.of(HttpMethod.GET))
                .setAllowedHeaders(List.of("*"))
                .build();

        registerCorsConfig("/users/items", userItemsConfig);
    }

    private void stripeCorsConfig(){
        final CorsConfiguration userItemsConfig = new CorsConfigurationBuilder()
                .setAllowedOrigins(Collections.singletonList(appProperties.getClientRoute()))
                .setAllowedMethods(List.of(HttpMethod.GET, HttpMethod.POST))
                .setAllowedHeaders(List.of("*"))
                .build();

        registerCorsConfig("/stripe/**", userItemsConfig);
    }
}
