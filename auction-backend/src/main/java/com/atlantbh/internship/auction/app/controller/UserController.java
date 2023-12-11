package com.atlantbh.internship.auction.app.controller;

import com.atlantbh.internship.auction.app.dto.item.UserItemDto;
import com.atlantbh.internship.auction.app.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }


    @GetMapping("items")
    public ResponseEntity<List<UserItemDto>> getAllUserItems() {
        return new ResponseEntity<>(userService.findAllItemsOwnedByUser(), HttpStatus.OK);
    }
}
