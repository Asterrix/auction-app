package com.atlantbh.internship.auction.app.config.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {
    @Value("${firebase.credentials}")
    private String firebaseCredentials;


    @Bean
    public void initialise() throws IOException {
        final InputStream serviceAccount = new ByteArrayInputStream(firebaseCredentials.getBytes());
        final FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket("auctionapp-4dbe4.appspot.com")
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }
}
