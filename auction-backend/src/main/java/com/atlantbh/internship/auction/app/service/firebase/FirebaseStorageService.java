package com.atlantbh.internship.auction.app.service.firebase;

import com.google.cloud.storage.Blob;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FirebaseStorageService {
    List<Blob> uploadFiles(final List<MultipartFile> files);
}
