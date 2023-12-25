package com.atlantbh.internship.auction.app.config.featured;

import com.atlantbh.internship.auction.app.service.featured.category.CategorySuggestion;
import com.atlantbh.internship.auction.app.service.featured.criteria.AuthenticatedUserCriteria;
import com.atlantbh.internship.auction.app.service.featured.criteria.RegularUserCriteria;
import com.atlantbh.internship.auction.app.service.featured.price.PriceSuggestion;
import org.springframework.beans.factory.support.DefaultSingletonBeanRegistry;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.ZonedDateTime;

@Configuration
public class FeaturedItemSuggestionConfig {

    private final ApplicationContext context;

    public FeaturedItemSuggestionConfig(final ApplicationContext context) {
        this.context = context;
    }

    @Bean
    PriceSuggestion itemPriceSuggestion() {
        final BigDecimal startingPriceMultiplier = new BigDecimal("0.5");
        final BigDecimal endPriceMultiplier = new BigDecimal("1.5");
        final int decimalScale = 2;
        final RoundingMode roundingMode = RoundingMode.HALF_DOWN;


        return new PriceSuggestion(
                startingPriceMultiplier,
                endPriceMultiplier,
                decimalScale,
                roundingMode
        );
    }

    @Bean(name = "regularUserCriteria")
    RegularUserCriteria regularUserCriteria() {
        final ZonedDateTime endTimeLimit = ZonedDateTime.now().plusWeeks(2);

        return new RegularUserCriteria(endTimeLimit);
    }

    @Scheduled(fixedRate = 3600000) // 1 hour
    public void refreshRegularUserCriteria() {
        final DefaultSingletonBeanRegistry registry = (DefaultSingletonBeanRegistry) context.getAutowireCapableBeanFactory();
        registry.destroySingleton("regularUserCriteria");
        registry.registerSingleton("regularUserCriteria", regularUserCriteria());
    }

    @Bean("authenticatedUserCriteria")
    AuthenticatedUserCriteria authenticatedUserCriteria() {
        final ZonedDateTime currentTime = ZonedDateTime.now();
        final ZonedDateTime userRelatedItemsTimeSpan = currentTime.plusMonths(6);
        final ZonedDateTime endTimeStartLimit = currentTime.plusMinutes(10);
        final ZonedDateTime endTimeEndLimit = currentTime.plusMonths(1);

        return new AuthenticatedUserCriteria(
                userRelatedItemsTimeSpan,
                endTimeStartLimit,
                endTimeEndLimit,
                itemPriceSuggestion(),
                new CategorySuggestion());
    }

    @Scheduled(fixedRate = 480000) // 8 minutes
    public void refreshAuthenticatedUserCriteria() {
        final DefaultSingletonBeanRegistry registry = (DefaultSingletonBeanRegistry) context.getAutowireCapableBeanFactory();
        registry.destroySingleton("authenticatedUserCriteria");
        registry.registerSingleton("authenticatedUserCriteria", authenticatedUserCriteria());
    }
}
