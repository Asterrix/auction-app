package com.atlantbh.internship.auction.app.service.firebase;

import com.atlantbh.internship.auction.app.model.utils.Validator;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FirebaseStorage implements FirebaseStorageService {
    private final Validator<List<MultipartFile>> imageValidation;

    public FirebaseStorage(final Validator<List<MultipartFile>> imageValidation) {
        this.imageValidation = imageValidation;
    }

    @Override
    public List<Blob> uploadFiles(final List<MultipartFile> files) {
        imageValidation.validate(files);


        return files.stream()
                .map(file -> {
                    try {
                        final String id = UUID.randomUUID().toString();
                        final byte[] content = file.getBytes();
                        final String contentType = file.getContentType();

                        final Blob blob = StorageClient.getInstance().bucket().create(id, content, contentType);

                        // Make image accessible to anonymous users for read operation
                        blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));

                        return blob;
                    } catch (final IOException e) {
                        throw new RuntimeException("Error occurred while trying to upload images to FirebaseStorage service.");
                    }
                }).collect(Collectors.toList());
    }

}
