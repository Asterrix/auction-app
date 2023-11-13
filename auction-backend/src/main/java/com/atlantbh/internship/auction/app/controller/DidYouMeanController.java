package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.search.SearchSuggestion;
import com.atlantbh.internship.auction.app.service.DidYouMeanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/search")
public class DidYouMeanController {
    private final DidYouMeanService didYouMeanService;

    public DidYouMeanController(final DidYouMeanService didYouMeanService) {
        this.didYouMeanService = didYouMeanService;
    }

    @GetMapping
    public ResponseEntity<SearchSuggestion> getSearchSuggestion(@RequestParam final String searchInput) {
        return new ResponseEntity<>(didYouMeanService.didYouMean(searchInput), HttpStatus.OK);
    }
}
