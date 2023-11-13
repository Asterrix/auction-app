package com.atlantbh.internship.auction.app.service.impl;

import com.atlantbh.internship.auction.app.dto.search.SearchSuggestion;
import com.atlantbh.internship.auction.app.model.impl.JaccardIndex;
import com.atlantbh.internship.auction.app.repository.ItemRepository;
import com.atlantbh.internship.auction.app.service.DidYouMeanService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DidYouMeanServiceImpl implements DidYouMeanService {
    private final ItemRepository itemRepository;

    public DidYouMeanServiceImpl(final ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public SearchSuggestion didYouMean(final String input) {
        if (input.isEmpty()) {
            return new SearchSuggestion("");
        }

        List<String> items = itemRepository.getListOfItemNames();
        JaccardIndex jaccardIndex = new JaccardIndex(input);

        return new SearchSuggestion(jaccardIndex.calculateSimilarity(items));
    }
}
