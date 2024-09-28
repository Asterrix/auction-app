package com.atlantbh.internship.auction.app.model.impl;

import com.atlantbh.internship.auction.app.model.ItemDateRecord;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public final class ItemDate {

    public static String getFormattedDate(final LocalDate startDate, final LocalDate endDate) {
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Start date is ahead of end date. Check your parameters.");
        }

        ItemDateRecord dateRecord = calculateDate(startDate, endDate);
        return formatDate(dateRecord);
    }

    private static ItemDateRecord calculateDate(final LocalDate startDate, final LocalDate endDate) {
        final int daysInWeek = 7;
        final long daysBetween = ChronoUnit.DAYS.between(startDate, endDate);

        final long weeks = daysBetween / daysInWeek;
        final long remainingDays = daysBetween % daysInWeek;

        return new ItemDateRecord(weeks, remainingDays);
    }

    private static String formatDate(final ItemDateRecord dateRecord) {
        StringBuilder stringBuilder = new StringBuilder();
        String whiteSpace = " ";

        if (dateRecord.weeks() == 1) {
            stringBuilder.append(dateRecord.weeks()).append(whiteSpace).append("Week");
        } else if (dateRecord.weeks() > 1) {
            stringBuilder.append(dateRecord.weeks()).append(whiteSpace).append("Weeks");
        }

        if (!stringBuilder.isEmpty()) {
            stringBuilder.append(whiteSpace);
        }

        if (dateRecord.remainingDays() == 1) {
            stringBuilder.append(dateRecord.remainingDays()).append(whiteSpace).append("Day");
        } else if (dateRecord.remainingDays() > 1) {
            stringBuilder.append(dateRecord.remainingDays()).append(whiteSpace).append("Days");
        }

        return stringBuilder.toString();
    }

}
