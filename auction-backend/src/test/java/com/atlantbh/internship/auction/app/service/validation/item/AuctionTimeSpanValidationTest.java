package com.atlantbh.internship.auction.app.service.validation.item;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.*;

class AuctionTimeSpanValidationTest {
    AuctionTimeSpanValidator auctionTimeSpanValidation;

    LocalDateTime localDateTime;

    ZoneId zoneId;

    @BeforeEach
    void setUp() {
        localDateTime = LocalDateTime.of(2000, 1, 1, 3, 0);
        zoneId = ZoneId.systemDefault();
        auctionTimeSpanValidation = new AuctionTimeSpanValidator();
    }

    @Test
    @DisplayName("Start time and end time are equal")
    void ensureDifferentDateTime_WhenDateTimeIsTheSame_ThrowValidationException() {
        final ZonedDateTime startTime = ZonedDateTime.of(localDateTime, zoneId);
        final ZonedDateTime endTime = ZonedDateTime.of(localDateTime, zoneId);
        final ItemTimeSpan timeSpan = new ItemTimeSpan(startTime, endTime);

        final ValidationException validationException = assertThrows(
                ValidationException.class,
                () -> auctionTimeSpanValidation.validate(timeSpan)
        );

        assertEquals(
                "Ensure that the time span between start date and end date is at least 3 hours.",
                validationException.getMessage());
    }

    @Test
    @DisplayName("Start time comes before the end time")
    void ensureStartTimeBeforeEndTime_WhenEndTimeIsPriorToStartTime_ThrowValidationException() {
        final ZonedDateTime startTime = ZonedDateTime.of(localDateTime, zoneId);
        final ZonedDateTime endTime = ZonedDateTime.of(localDateTime.minusMonths(1), zoneId);
        final ItemTimeSpan timeSpan = new ItemTimeSpan(startTime, endTime);

        final ValidationException validationException = assertThrows(
                ValidationException.class,
                () -> auctionTimeSpanValidation.validate(timeSpan));

        assertEquals(
                "Ensure that the start date of the item precedes the specified end date.",
                validationException.getMessage());
    }

    @Test
    @DisplayName("Time span between start and end time is less than 3")
    void validateTimeSpan_WhenTimeDifferenceIsLessThanThreeHours_ThrowValidationException() {
        final ZonedDateTime startTime = ZonedDateTime.of(localDateTime, zoneId);
        final ZonedDateTime endTime = ZonedDateTime.of(
                localDateTime
                        .plusHours(2)
                        .plusMinutes(59)
                        .plusSeconds(59), zoneId);

        final ItemTimeSpan timeSpan = new ItemTimeSpan(startTime, endTime);

        final ValidationException validationException = assertThrows(
                ValidationException.class,
                () -> auctionTimeSpanValidation.validate(timeSpan));

        assertEquals("Minimum time span for auction time is 3 hours.", validationException.getMessage());
    }

    @Test
    @DisplayName("Time span is 3 hours")
    void validateTimeSpan_WhenTimeDifferenceIsThreeHours_ContinueExecution() {
        final ZonedDateTime startTime = ZonedDateTime.of(localDateTime, zoneId);
        final ZonedDateTime endTime = ZonedDateTime.of(localDateTime.plusHours(3), zoneId);

        final ItemTimeSpan timeSpan = new ItemTimeSpan(startTime, endTime);

        assertDoesNotThrow(() -> auctionTimeSpanValidation.validate(timeSpan));
    }
}