package com.atlantbh.internship.auction.app.model;

import com.atlantbh.internship.auction.app.model.impl.TimeRemainingCalculator;
import org.junit.jupiter.api.Test;

import java.time.DateTimeException;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class TimeRemainingCalculatorTest {

    @Test
    void CalculateItemRemainingTime_ValidateDate_ThrowException_EndDateComesBeforeStartDate() {
        assertThrows(IllegalArgumentException.class, () -> {
            final LocalDate startDate = LocalDate.of(2023, 8, 28);
            final LocalDate endDate = LocalDate.of(2023, 8, 29);

            TimeRemainingCalculator.getTimeRemaining(endDate, startDate);
        });
    }

    @Test
    void CalculateItemRemainingTime_ValidateDate_ThrowException_NotALeapYear() {
        assertThrows(DateTimeException.class, () -> {
            final LocalDate startDate = LocalDate.of(1800, 2, 31);
            final LocalDate endDate = LocalDate.of(1802, 3, 1);

            TimeRemainingCalculator.getTimeRemaining(endDate, startDate);
        });
    }

    @Test
    void CalculateItemRemainingTime_ValidateDate_ValidInput_DontThrowException() {
        assertDoesNotThrow(() -> {
            final LocalDate startDate = LocalDate.of(1999, 2, 28);
            final LocalDate endDate = LocalDate.of(1999, 3, 17);

            TimeRemainingCalculator.getTimeRemaining(startDate, endDate);
        });
    }

    @Test
    void CalculateItemRemainingTime_ConvertToString_ReturnSingularDate() {
        final LocalDate startDate = LocalDate.of(2023, 8, 28);
        final LocalDate endDate = LocalDate.of(2023, 8, 29);

        final String formatDate = TimeRemainingCalculator.getTimeRemaining(startDate, endDate);

        assertEquals("1 Day", formatDate);
    }

    @Test
    void CalculateItemRemainingTime_ConvertToString_ReturnPluralNumberOfDays() {
        final LocalDate startDate = LocalDate.of(2023, 10, 1);
        final LocalDate endDate = LocalDate.of(2023, 10, 5);

        final String formatDate = TimeRemainingCalculator.getTimeRemaining(startDate, endDate);

        assertEquals("4 Days", formatDate);
    }

    @Test
    void CalculateItemRemainingTime_ConvertToString_ReturnSingularWeek() {
        final LocalDate startDate = LocalDate.of(2023, 5, 1);
        final LocalDate endDate = LocalDate.of(2023, 5, 9);

        final String formatDate = TimeRemainingCalculator.getTimeRemaining(startDate, endDate);

        assertEquals("1 Week 1 Day", formatDate);
    }

    @Test
    void CalculateItemRemainingTime_ConvertToString_ReturnPluralWeeksDays() {
        final LocalDate startDate = LocalDate.of(2023, 2, 28);
        final LocalDate endDate = LocalDate.of(2023, 3, 20);

        final String formatDate = TimeRemainingCalculator.getTimeRemaining(startDate, endDate);

        assertEquals("2 Weeks 6 Days", formatDate);
    }
}