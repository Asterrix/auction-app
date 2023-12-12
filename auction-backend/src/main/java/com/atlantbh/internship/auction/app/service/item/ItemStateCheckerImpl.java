package com.atlantbh.internship.auction.app.service.item;

import com.atlantbh.internship.auction.app.entity.Item;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.List;

@Component
public class ItemStateCheckerImpl implements ItemStateChecker {

    @Override
    public Item updateFinishedAttribute(final Item item) {
        final Boolean finished = item.getFinished();
        final ZonedDateTime currentTime = ZonedDateTime.now();
        final ZonedDateTime itemEndTime = item.getEndTime();

        if (!finished && currentTime.isAfter(itemEndTime)) {
            item.setFinished(true);
        }

        return item;
    }

    @Override
    public List<Item> updateFinishedAttribute(final List<Item> items) {
        return items.stream().map(this::updateFinishedAttribute).toList();
    }

}
