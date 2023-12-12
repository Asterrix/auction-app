package com.atlantbh.internship.auction.app.service.item;

import com.atlantbh.internship.auction.app.entity.Item;

import java.util.List;

public interface ItemStateChecker {
    Item updateFinishedAttribute(final Item item);

    List<Item> updateFinishedAttribute(final List<Item> items);
}
