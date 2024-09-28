package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.bid.BidRequest;
import com.atlantbh.internship.auction.app.service.BiddingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/bids")
public class BiddingController {
    private final BiddingService biddingService;

    public BiddingController(final BiddingService biddingService) {
        this.biddingService = biddingService;
    }

    @PostMapping
    ResponseEntity<Void> bidOnItem(@RequestBody BidRequest bidRequest) {
        biddingService.makeAnOfferOnItem(bidRequest);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
