package com.atlantbh.internship.auction.app.model.impl;

import com.atlantbh.internship.auction.app.model.DateInterval;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public final class TimeRemainingCalculator {

    private TimeRemainingCalculator() {
    }

    public static String getTimeRemaining(final LocalDate startDate, final LocalDate endDate) {
        validateDate(startDate, endDate);

        final DateInterval calculatedDateInterval = calculateDateInterval(startDate, endDate);

        return convertToString(calculatedDateInterval);
    }

    private static void validateDate(final LocalDate startDate, final LocalDate endDate) {
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Start date is ahead of end date. Check your parameters.");
        }
    }

    private static DateInterval calculateDateInterval(final LocalDate startDate, final LocalDate endDate) {
        final int daysInWeek = 7;
        final long daysBetween = ChronoUnit.DAYS.between(startDate, endDate);

        final long weeks = daysBetween / daysInWeek;
        final long remainingDays = daysBetween % daysInWeek;

        return new DateInterval(weeks, remainingDays);
    }

    private static String convertToString(final DateInterval calculatedDateInterval) {
        StringBuilder stringBuilder = new StringBuilder();
        final String whiteSpace = " ";

        final long remainingWeeks = calculatedDateInterval.weeks();
        final long remainingDays = calculatedDateInterval.remainingDays();

        if (remainingWeeks > 0) {
            stringBuilder.append(remainingWeeks).append(whiteSpace).append(remainingWeeks == 1 ? "Week" : "Weeks");
        }

        if (remainingWeeks > 0 && remainingDays > 0) {
            stringBuilder.append(whiteSpace);
        }

        if (remainingDays > 0) {
            stringBuilder.append(remainingDays).append(whiteSpace).append(remainingDays == 1 ? "Day" : "Days");
        }

        return stringBuilder.toString();
    }

}
