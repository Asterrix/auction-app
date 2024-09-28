package com.atlantbh.internship.auction.app.model;

import com.atlantbh.internship.auction.app.model.impl.TimeRemainingCalculator;
import org.junit.jupiter.api.Test;

import java.time.*;

import static org.junit.jupiter.api.Assertions.*;

class TimeRemainingCalculatorTest {

    @Test
    void validateDate_ShouldThrow_NotALeapYearException() {
        assertThrows(DateTimeException.class, () -> LocalDate.of(1800, 2, 31));
    }

    @Test
    void validateDate_ValidInput_ShouldNotThrowException() {
        final LocalDate startDate = LocalDate.of(1999, 2, 28);
        final LocalDate endDate = LocalDate.of(1999, 3, 17);
        final ZonedDateTime startTime = ZonedDateTime.of(startDate, LocalTime.now(), ZoneId.systemDefault());
        final ZonedDateTime endTime = ZonedDateTime.of(endDate, LocalTime.now(), ZoneId.systemDefault());

        assertDoesNotThrow(() -> {
            TimeRemainingCalculator.getTimeRemaining(startTime, endTime);
        });
    }

    @Test
    void convertToString_ShouldReturnSingularDateDay() {
        final LocalDate startDate = LocalDate.of(2023, 8, 28);
        final LocalDate endDate = LocalDate.of(2023, 8, 29);
        final ZonedDateTime startTime = ZonedDateTime.of(startDate, LocalTime.now(), ZoneId.systemDefault());
        final ZonedDateTime endTime = ZonedDateTime.of(endDate, LocalTime.now(), ZoneId.systemDefault());

        final String formatDate = TimeRemainingCalculator.getTimeRemaining(startTime, endTime);

        assertEquals("1 Day", formatDate);
    }

    @Test
    void convertToString_ShouldReturnPluralDateDays() {
        final LocalDate startDate = LocalDate.of(2023, 10, 1);
        final LocalDate endDate = LocalDate.of(2023, 10, 5);
        final ZonedDateTime startTime = ZonedDateTime.of(startDate, LocalTime.now(), ZoneId.systemDefault());
        final ZonedDateTime endTime = ZonedDateTime.of(endDate, LocalTime.now(), ZoneId.systemDefault());

        final String formatDate = TimeRemainingCalculator.getTimeRemaining(startTime, endTime);

        assertEquals("4 Days", formatDate);
    }

    @Test
    void convertToString_ShouldReturnSingularWeekDay() {
        final LocalDate startDate = LocalDate.of(2023, 5, 1);
        final LocalDate endDate = LocalDate.of(2023, 5, 9);
        final ZonedDateTime startTime = ZonedDateTime.of(startDate, LocalTime.now(), ZoneId.systemDefault());
        final ZonedDateTime endTime = ZonedDateTime.of(endDate, LocalTime.now(), ZoneId.systemDefault());

        final String formatDate = TimeRemainingCalculator.getTimeRemaining(startTime, endTime);

        assertEquals("1 Week 1 Day", formatDate);
    }

    @Test
    void convertToString_ShouldReturnPluralWeekDays() {
        final LocalDate startDate = LocalDate.of(2023, 2, 28);
        final LocalDate endDate = LocalDate.of(2023, 3, 20);
        final ZonedDateTime startTime = ZonedDateTime.of(startDate, LocalTime.now(), ZoneId.systemDefault());
        final ZonedDateTime endTime = ZonedDateTime.of(endDate, LocalTime.now(), ZoneId.systemDefault());

        final String formatDate = TimeRemainingCalculator.getTimeRemaining(startTime, endTime);

        assertEquals("2 Weeks 6 Days", formatDate);
    }
}