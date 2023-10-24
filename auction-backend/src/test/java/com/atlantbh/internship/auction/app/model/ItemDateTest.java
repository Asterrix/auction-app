package com.atlantbh.internship.auction.app.model;

import com.atlantbh.internship.auction.app.model.impl.ItemDate;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ItemDateTest {

    @Test
    void ItemDateImpl_GetFormattedDate_ThrowException_EndDateComesBeforeStartDate() {
        assertThrows(IllegalArgumentException.class, () -> {
            LocalDate startDate = LocalDate.of(2023, 8, 28);
            LocalDate endDate = LocalDate.of(2023, 8, 29);

            ItemDate.getFormattedDate(endDate, startDate);
        });
    }

    @Test
    void ItemDateImpl_GetFormattedDate_ReturnSingularDate() {
        LocalDate startDate = LocalDate.of(2023, 8, 28);
        LocalDate endDate = LocalDate.of(2023, 8, 29);

        String formatDate = ItemDate.getFormattedDate(startDate, endDate);

        assertEquals("1 Day", formatDate);
    }

    @Test
    void ItemDateImpl_GetFormattedDate_ReturnPluralNumberOfDays() {
        LocalDate startDate = LocalDate.of(2023, 10, 1);
        LocalDate endDate = LocalDate.of(2023, 10, 5);

        String formatDate = ItemDate.getFormattedDate(startDate, endDate);

        assertEquals("4 Days", formatDate);
    }

    @Test
    void ItemDateImpl_GetFormattedDate_ReturnSingularWeek() {
        LocalDate startDate = LocalDate.of(2023, 5, 1);
        LocalDate endDate = LocalDate.of(2023, 5, 9);

        String formatDate = ItemDate.getFormattedDate(startDate, endDate);

        assertEquals("1 Week 1 Day", formatDate);
    }

    @Test
    void ItemDateImpl_GetFormattedDate_ReturnPluralWeeksDays() {
        LocalDate startDate = LocalDate.of(2023, 2, 28);
        LocalDate endDate = LocalDate.of(2023, 3, 20);

        String formatDate = ItemDate.getFormattedDate(startDate, endDate);

        assertEquals("2 Weeks 6 Days", formatDate);
    }
}