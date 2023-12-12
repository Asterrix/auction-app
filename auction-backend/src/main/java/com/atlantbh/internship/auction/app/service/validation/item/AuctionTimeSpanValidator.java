package com.atlantbh.internship.auction.app.service.validation.item;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.model.utils.Validator;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;

@Component
public class AuctionTimeSpanValidator implements Validator<ItemTimeSpan> {
    private static final int MIN_ALLOWED_TIME_SPAN_HOURS = 3;

    private void ensureDifferentDateTime(final ZonedDateTime startTime, final ZonedDateTime endTime) {
        if (startTime.isEqual(endTime)) {
            final String message = String.format("Ensure that the time span between start date and end date is at least %d hours.", MIN_ALLOWED_TIME_SPAN_HOURS);
            throw new ValidationException(message);
        }
    }

    private void ensureStartTimeBeforeEndTime(final ZonedDateTime startTime, final ZonedDateTime endTime) {
        if (startTime.isAfter(endTime)) {
            throw new ValidationException("Ensure that the start date of the item precedes the specified end date.");
        }
    }

    private void validateTimeSpan(final ZonedDateTime startTime, final ZonedDateTime endTime) {
        final int hourDistance = Math.abs(startTime.getHour() - endTime.getHour());

        if (isSameDate(startTime, endTime) && hourDistance < MIN_ALLOWED_TIME_SPAN_HOURS) {
            final String message = String.format("Minimum time span for auction time is %d hours.", MIN_ALLOWED_TIME_SPAN_HOURS);
            throw new ValidationException(message);
        }
    }

    private boolean isSameDate(final ZonedDateTime startTime, final ZonedDateTime endTime) {
        return startTime.toLocalDate().isEqual(endTime.toLocalDate());
    }

    @Override
    public void validate(final ItemTimeSpan timeSpan) {
        final ZonedDateTime startTime = timeSpan.startTime();
        final ZonedDateTime endTime = timeSpan.endTime();

        ensureDifferentDateTime(startTime, endTime);
        ensureStartTimeBeforeEndTime(startTime, endTime);
        validateTimeSpan(startTime, endTime);
    }
}
