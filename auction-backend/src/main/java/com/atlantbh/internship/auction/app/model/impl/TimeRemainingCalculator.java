package com.atlantbh.internship.auction.app.model.impl;

import com.atlantbh.internship.auction.app.model.DateInterval;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public final class TimeRemainingCalculator {

    private TimeRemainingCalculator() {
    }

    public static String getTimeRemaining(final LocalDateTime startTime, final LocalDateTime endTime) {
        validateDate(startTime, endTime);

        final DateInterval calculatedDateInterval = calculateDateInterval(startTime, endTime);

        return convertToString(calculatedDateInterval);
    }

    private static void validateDate(final LocalDateTime startTime, final LocalDateTime endTime) {
        if (startTime.isAfter(endTime)) {
            throw new IllegalArgumentException("Start date is ahead of end date. Check your parameters.");
        }
    }

    private static DateInterval calculateDateInterval(final LocalDateTime startTime, final LocalDateTime endTime) {
        final int daysInWeek = 7;
        final long daysBetween = ChronoUnit.DAYS.between(startTime, endTime);

        final long weeks = daysBetween / daysInWeek;
        final long remainingDays = daysBetween % daysInWeek;

        return new DateInterval(weeks, remainingDays);
    }

    private static String convertToString(final DateInterval calculatedDateInterval) {
        final StringBuilder stringBuilder = new StringBuilder();
        final String space = " ";

        final long remainingWeeks = calculatedDateInterval.weeks();
        final long remainingDays = calculatedDateInterval.remainingDays();

        if (remainingWeeks > 0) {
            stringBuilder.append(remainingWeeks).append(space).append(remainingWeeks == 1 ? "Week" : "Weeks");
        }

        if (remainingWeeks > 0 && remainingDays > 0) {
            stringBuilder.append(space);
        }

        if (remainingDays > 0) {
            stringBuilder.append(remainingDays).append(space).append(remainingDays == 1 ? "Day" : "Days");
        }

        return stringBuilder.toString();
    }

}
