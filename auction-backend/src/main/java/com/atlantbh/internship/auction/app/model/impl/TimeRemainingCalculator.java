package com.atlantbh.internship.auction.app.model.impl;

import com.atlantbh.internship.auction.app.model.DateInterval;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;

public final class TimeRemainingCalculator {

    private TimeRemainingCalculator() {
    }

    public static String getTimeRemaining(final ZonedDateTime currentTime, final ZonedDateTime endTime) {
        final DateInterval calculatedDateInterval = calculateDateInterval(currentTime, endTime);

        return convertToString(calculatedDateInterval);
    }

    private static DateInterval calculateDateInterval(final ZonedDateTime startTime, final ZonedDateTime endTime) {
        if (startTime.isAfter(endTime)) {
            return new DateInterval(0, 0, 0, 0);
        }

        final long totalMinutes = ChronoUnit.MINUTES.between(startTime, endTime);
        final int secondMinutes = 60;
        final int hoursInDay = 24;
        final int daysInWeek = 7;

        final long weeks = totalMinutes / (daysInWeek * hoursInDay * secondMinutes);
        final long remainingDays = (totalMinutes % (daysInWeek * hoursInDay * secondMinutes)) / (hoursInDay * secondMinutes);
        final long remainingHours = (totalMinutes % (hoursInDay * secondMinutes)) / secondMinutes;
        final long remainingMinutes = totalMinutes % secondMinutes;

        return new DateInterval(weeks, remainingDays, remainingHours, remainingMinutes);
    }

    private static String convertToString(final DateInterval calculatedDateInterval) {
        final StringBuilder stringBuilder = new StringBuilder();
        final String space = " ";

        final long remainingWeeks = calculatedDateInterval.remainingWeeks();
        final long remainingDays = calculatedDateInterval.remainingDays();
        final long remainingHours = calculatedDateInterval.remainingHours();
        final long remainingMinutes = calculatedDateInterval.remainingMinutes();

        if (remainingWeeks == 0 && remainingDays == 0 && remainingHours == 0 && remainingMinutes == 0) {
            stringBuilder.append("Finished");
            return stringBuilder.toString();
        }

        if (remainingWeeks > 0) {
            stringBuilder.append(remainingWeeks).append(space).append(remainingWeeks == 1 ? "Week" : "Weeks");

            if (remainingDays > 0) {
                stringBuilder.append(space);
                stringBuilder.append(remainingDays).append(space).append(remainingDays == 1 ? "Day" : "Days");
            }

            return stringBuilder.toString();
        }

        if (remainingDays > 0) {
            stringBuilder.append(remainingDays).append(space).append(remainingDays == 1 ? "Day" : "Days");
            return stringBuilder.toString();
        }

        if (remainingHours > 0) {
            stringBuilder.append(remainingHours).append(space).append(remainingHours == 1 ? "Hour" : "Hours");
            return stringBuilder.toString();
        }

        if (remainingMinutes > 0) {
            stringBuilder.append(remainingMinutes).append(space).append("Minutes");
        }

        return stringBuilder.toString();
    }
}
