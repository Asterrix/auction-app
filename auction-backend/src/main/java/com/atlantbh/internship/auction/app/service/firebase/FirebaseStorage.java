package com.atlantbh.internship.auction.app.service.firebase;

import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FirebaseStorage implements FirebaseStorageService {

    @Override
    public List<Blob> uploadFiles(final List<MultipartFile> files) {
        List<Blob> blobList = new ArrayList<>();

        files.forEach(file -> {
            try {
                final String id = UUID.randomUUID().toString();
                final byte[] content = file.getBytes();
                final String contentType = file.getContentType();

                final Blob blob = StorageClient.getInstance().bucket().create(id, content, contentType);

                // Make image accessible to anonymous users for read operation
                blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));

                blobList.add(blob);
            } catch (IOException e) {
                throw new RuntimeException("Error occurred while trying to upload images to FirebaseStorage service.");
            }
        });

        return blobList;
    }

}
