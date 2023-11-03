package com.atlantbh.internship.auction.app.config;

import com.atlantbh.internship.auction.app.config.constant.AuctionAppProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    private final AuctionAppProperties appProperties;

    public CorsConfig(final AuctionAppProperties appProperties) {
        this.appProperties = appProperties;
    }

    /**
     * Creates a WebMvcConfigurer bean that configures CORS for the application.
     *
     * @return a WebMvcConfigurer bean that configures CORS
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull final CorsRegistry registry) {
                addItemMapping(registry);
                addCategoryMapping(registry);
            }
        };
    }

    /**
     * Adds a GET request mapping to the given CORS registry, with the specified path and allowed methods.
     *
     * @param registry       the CORS registry to add the mapping to
     * @param path           the path to map the HTTP requests to
     * @param allowedMethods the allowed methods for the path
     */
    private void createMapping(final CorsRegistry registry, final String path, final String[] allowedMethods) {
        final String pathPattern = appProperties.getApiVersion() + path;

        registry.addMapping(pathPattern)
                .allowedOrigins(appProperties.getClientRoute())
                .allowedMethods(allowedMethods);
    }

    /* Cors Mappings For Controller Endpoints */
    private void addItemMapping(final CorsRegistry registry) {
        createMapping(registry, "/items", new String[]{HttpMethod.GET.name()});
        createMapping(registry, "/items/{id}", new String[]{HttpMethod.GET.name()});
        createMapping(registry, "/items/featured", new String[]{HttpMethod.GET.name()});
    }

    private void addCategoryMapping(final CorsRegistry registry) {
        createMapping(registry, "/categories", new String[]{HttpMethod.GET.name()});
    }
}