package com.atlantbh.internship.auction.app.service.featured.strategy;

import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.service.featured.criteria.RegularUserCriteria;
import com.atlantbh.internship.auction.app.service.featured.criteria.SearchCriteria;
import com.atlantbh.internship.auction.app.service.featured.search.SearchSuggestion;
import com.atlantbh.internship.auction.app.service.item.ItemService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class RegularUserSuggestionStrategy implements RegularSuggestionStrategy {
    private static final int ITEM_COUNT_TO_SHUFFLE = 64;
    private final RegularUserCriteria regularUserCriteria;
    private final ItemService itemService;
    private final SearchSuggestion searchSuggestion;
    private final SearchCriteria searchCriteria;

    public RegularUserSuggestionStrategy(final RegularUserCriteria regularUserCriteria,
                                         final ItemService itemService,
                                         final SearchSuggestion searchSuggestion,
                                         final SearchCriteria searchCriteria) {
        this.regularUserCriteria = regularUserCriteria;
        this.itemService = itemService;
        this.searchSuggestion = searchSuggestion;
        this.searchCriteria = searchCriteria;
    }

    @Override
    public Optional<List<Item>> suggestions(final String searchQuery, final int itemCount) {
        final Specification<Item> specification = regularUserCriteria.criteria();

        if (StringUtils.isBlank(searchQuery)) {
            return createSuggestion(itemCount, specification);
        }

        return createSuggestionQueryParams(searchQuery, itemCount, specification);
    }

    /**
     * @param searchQuery   search query
     * @param itemCount     number of items to return
     * @param specification specification to filter items
     * @return list of items that most closely match the search query and the specification
     */
    private Optional<List<Item>> createSuggestionQueryParams(final String searchQuery, final int itemCount, final Specification<Item> specification) {
        final List<Item> items = itemService.findAll(specification);

        if (items.isEmpty()) {
            return Optional.empty();
        }

        final List<String> itemNames = items.stream().map(Item::getName).toList();
        final List<String> searchSuggestions = searchSuggestion.createSearchSuggestion(itemNames, searchQuery);
        final Specification<Item> searchSpecification = searchCriteria.criteria(itemCount, searchSuggestions);

        final List<Item> result = itemService.findAll(searchSpecification).stream().sorted(
                (item1, item2) -> {
                    final String firstName = item1.getName();
                    final String secondName = item2.getName();

                    return StringUtils.compare(firstName, secondName);
                }
        ).limit(itemCount).toList();

        return Optional.of(result);
    }

    /**
     * @param itemCount     number of items to return
     * @param specification specification to filter items
     * @return list of items
     */
    private Optional<List<Item>> createSuggestion(final int itemCount, final Specification<Item> specification) {
        final List<Item> items = itemService.findAll(specification, Pageable.ofSize(ITEM_COUNT_TO_SHUFFLE)).getContent();

        if (items.isEmpty()) {
            return Optional.empty();
        }

        final List<Item> shuffledItems = performShuffle(items);

        return Optional.of(shuffledItems.stream().limit(itemCount).collect(Collectors.toList()));
    }

    /**
     * @param itemList list of items to shuffle
     * @return shuffled list of items
     */
    private List<Item> performShuffle(final List<Item> itemList) {
        final List<Item> items = new ArrayList<>(itemList);
        Collections.shuffle(items);

        return items;
    }
}
