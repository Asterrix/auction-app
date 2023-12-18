package com.atlantbh.internship.auction.app.service.item;

import com.atlantbh.internship.auction.app.entity.Item;

public interface ItemStateChanger {
    Item updateFinishedAttribute(final Item item);
}
