package com.atlantbh.internship.auction.app.service.validation.item;

import java.time.ZonedDateTime;

public record ItemTimeSpan(ZonedDateTime startTime, ZonedDateTime endTime) {
}
