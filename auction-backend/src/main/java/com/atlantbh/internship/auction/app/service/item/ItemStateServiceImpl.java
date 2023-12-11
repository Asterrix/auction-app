package com.atlantbh.internship.auction.app.service.item;

import com.atlantbh.internship.auction.app.entity.Item;
import com.atlantbh.internship.auction.app.service.time.TimeService;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class ItemStateServiceImpl implements ItemStateService {
    private final TimeService timeService;

    public ItemStateServiceImpl(final TimeService timeService) {
        this.timeService = timeService;
    }

    @Override
    public Item updateFinishedAttribute(final Item item) {
        final Boolean finished = item.getFinished();
        final ZonedDateTime currentTime = timeService.getCurrentZonedDateTime();
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
