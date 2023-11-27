package com.atlantbh.internship.auction.app.config;

import com.atlantbh.internship.auction.app.config.constant.AuctionAppProperties;
import com.atlantbh.internship.auction.app.config.cors.CorsApiConfiguration;
import com.atlantbh.internship.auction.app.service.TokenService;
import com.atlantbh.internship.auction.app.service.filter.TokenFilter;
import com.atlantbh.internship.auction.app.service.impl.LogoutService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {
    private final AuctionAppProperties appProperties;
    private final TokenService tokenService;
    private final LogoutService logoutService;

    public SecurityConfig(final AuctionAppProperties appProperties,
                          @Lazy final TokenService tokenService,
                          final LogoutService logoutService) {
        this.appProperties = appProperties;
        this.tokenService = tokenService;
        this.logoutService = logoutService;
    }

    private static Customizer<CsrfConfigurer<HttpSecurity>> csrfConfig() {
        return csrf -> csrf
                .ignoringRequestMatchers("api/v1/authentication")
                .ignoringRequestMatchers("api/v1/register");
    }

    @Bean
    public SecurityFilterChain filterChain(final HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(PagePrivacyManager::publicPages)
                .authorizeHttpRequests(PagePrivacyManager::swagger)
                .authorizeHttpRequests(PagePrivacyManager::privatePages)
                .cors(Customizer.withDefaults())
                .csrf(csrfConfig())
                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(new TokenFilter(tokenService, logoutService), BasicAuthenticationFilter.class)
                .logout(logout -> {
                    logout.logoutUrl("/api/v1/authentication/logout");
                    logout.addLogoutHandler(new LogoutService(tokenService));
                    logout.logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext());
                })
                .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        return new CorsApiConfiguration(appProperties).corsConfiguration();
    }
}
