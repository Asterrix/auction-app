package com.atlantbh.internship.auction.app.service.validation.item;

import com.atlantbh.internship.auction.app.exception.ValidationException;
import com.atlantbh.internship.auction.app.model.utils.Validator;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Component
public final class ItemImageValidator implements Validator<List<MultipartFile>> {
    private final static int MIN_ALLOWED_IMG_COUNT = 3;
    private final static int MAX_ALLOWED_IMG_COUNT = 30;
    private final static Set<String> ALLOWED_FILE_TYPE = Set.of("image/jpeg", "image/jpg", "image/png");

    private ItemImageValidator() {
    }

    private void validateListOfImageFiles(final List<MultipartFile> imageFiles) {
        imageFiles.forEach(image -> {
            if (!isValidImageFormat(image)) {
                throw new ValidationException("Invalid image format was found while processing a list of images.");
            }
        });
    }

    private boolean isValidImageFormat(final MultipartFile file) {
        final String fileContentType = file.getContentType();
        return ItemImageValidator.ALLOWED_FILE_TYPE.contains(fileContentType);
    }

    private void validateSize(final int size) {
        if (size < MIN_ALLOWED_IMG_COUNT) {
            final String message = String.format(
                    "Item must have a minimum of %d images and a maximum of %d images.",
                    MIN_ALLOWED_IMG_COUNT,
                    MAX_ALLOWED_IMG_COUNT);
            throw new ValidationException(message);
        }
    }

    @Override
    public void validate(final List<MultipartFile> imageFiles) {
        validateSize(imageFiles.size());
        validateListOfImageFiles(imageFiles);
    }
}