package com.atlantbh.internship.auction.app.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;

public class PagePrivacyManager {
    protected static AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry publicPages(
            final AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry auth
    ) {
        return auth
                .requestMatchers("api/v1/authentication").permitAll()
                .requestMatchers("api/v1/categories").permitAll()
                .requestMatchers("api/v1/items/**").permitAll()
                .requestMatchers("api/v1/register").permitAll();
    }

    protected static AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry privatePages(
            final AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry auth
    ) {
        return auth.anyRequest().authenticated();
    }

    protected static AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry swagger(
            final AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry auth
    ) {
        return auth
                .requestMatchers("swagger-ui/**").permitAll()
                .requestMatchers("v3/api-docs/**").permitAll();
    }
}