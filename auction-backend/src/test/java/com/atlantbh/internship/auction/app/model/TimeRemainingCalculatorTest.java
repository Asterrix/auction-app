package com.atlantbh.internship.auction.app.model;

import com.atlantbh.internship.auction.app.model.impl.TimeRemainingCalculator;
import org.junit.jupiter.api.Test;

import java.time.DateTimeException;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class TimeRemainingCalculatorTest {

    @Test
    void validateDate_ShouldThrow_StartDateAheadOfEndDateException() {
        final LocalDate startDate = LocalDate.of(2023, 8, 28);
        final LocalDate endDate = LocalDate.of(2023, 8, 29);

        assertThrows(IllegalArgumentException.class, () -> TimeRemainingCalculator.getTimeRemaining(endDate, startDate));
    }

    @Test
    void validateDate_ShouldThrow_NotALeapYearException() {
        assertThrows(DateTimeException.class, () -> LocalDate.of(1800, 2, 31));
    }

    @Test
    void validateDate_ValidInput_ShouldNotThrowException() {
        final LocalDate startDate = LocalDate.of(1999, 2, 28);
        final LocalDate endDate = LocalDate.of(1999, 3, 17);

        assertDoesNotThrow(() -> {
            TimeRemainingCalculator.getTimeRemaining(startDate, endDate);
        });
    }

    @Test
    void convertToString_ShouldReturnSingularDateDay() {
        final LocalDate startDate = LocalDate.of(2023, 8, 28);
        final LocalDate endDate = LocalDate.of(2023, 8, 29);

        final String formatDate = TimeRemainingCalculator.getTimeRemaining(startDate, endDate);

        assertEquals("1 Day", formatDate);
    }

    @Test
    void convertToString_ShouldReturnPluralDateDays() {
        final LocalDate startDate = LocalDate.of(2023, 10, 1);
        final LocalDate endDate = LocalDate.of(2023, 10, 5);

        final String formatDate = TimeRemainingCalculator.getTimeRemaining(startDate, endDate);

        assertEquals("4 Days", formatDate);
    }

    @Test
    void convertToString_ShouldReturnSingularWeekDay() {
        final LocalDate startDate = LocalDate.of(2023, 5, 1);
        final LocalDate endDate = LocalDate.of(2023, 5, 9);

        final String formatDate = TimeRemainingCalculator.getTimeRemaining(startDate, endDate);

        assertEquals("1 Week 1 Day", formatDate);
    }

    @Test
    void convertToString_ShouldReturnPluralWeekDays() {
        final LocalDate startDate = LocalDate.of(2023, 2, 28);
        final LocalDate endDate = LocalDate.of(2023, 3, 20);

        final String formatDate = TimeRemainingCalculator.getTimeRemaining(startDate, endDate);

        assertEquals("2 Weeks 6 Days", formatDate);
    }
}