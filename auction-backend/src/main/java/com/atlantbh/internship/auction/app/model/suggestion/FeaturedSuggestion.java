package com.atlantbh.internship.auction.app.model.suggestion;

import com.atlantbh.internship.auction.app.entity.Item;
import org.springframework.data.jpa.domain.Specification;

import java.time.ZonedDateTime;
import java.util.List;

public interface FeaturedSuggestion {
    Specification<Item> getUserItemsCriteria(final Integer userId, final ZonedDateTime currentTime);

    Specification<Item> getUserBidsCriteria(final Integer userId, final ZonedDateTime currentTime);

    Specification<Item> getAuthenticatedUserQueryCriteria(final Integer userId, final ZonedDateTime currentTime);

    Specification<Item> getRegularUserCriteria(final ZonedDateTime currentTime);

    Specification<Item> getAuthenticatedUserCriteria(final Integer userId, final List<Item> userRelatedItems, final ZonedDateTime currentTime);

    List<String> getSearchSuggestions(final List<Item> items, final String query, final Integer count);
}
