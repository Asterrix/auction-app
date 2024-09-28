package com.atlantbh.internship.auction.app.service.item;

import com.atlantbh.internship.auction.app.entity.Item;
import org.springframework.stereotype.Component;

@Component
public class ItemStateChangerImpl implements ItemStateChanger {

    @Override
    public Item updateFinishedAttribute(final Item item) {
        final Boolean finished = item.getFinished();

        if (!finished) {
            item.setFinished(true);
        }

        return item;
    }
}
