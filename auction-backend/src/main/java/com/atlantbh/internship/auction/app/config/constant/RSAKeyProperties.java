package com.atlantbh.internship.auction.app.config.constant;

import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.security.keyvault.secrets.SecretClient;
import com.azure.security.keyvault.secrets.SecretClientBuilder;
import com.azure.security.keyvault.secrets.models.KeyVaultSecret;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;

@Configuration
public class RSAKeyProperties {
    @Value("${rsa.vault-uri}")
    private String keyVaultUri;

    @Value("${rsa.vault-secret}")
    private String secret;

    @Value("${rsa.public-key}")
    private RSAPublicKey publicKey;

    public RSAPublicKey getPublicKey() {
        return publicKey;
    }

    @Bean
    public RSAPrivateKey getPrivateKey() throws NoSuchAlgorithmException, InvalidKeySpecException {
        final SecretClient secretClient = new SecretClientBuilder()
                .vaultUrl(keyVaultUri)
                .credential(new DefaultAzureCredentialBuilder().build())
                .buildClient();
        final KeyVaultSecret retrievedSecret = secretClient.getSecret(secret);

        final String key = retrievedSecret.getValue()
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s", "");

        final byte[] privateKeyBytes = Base64.getDecoder().decode(key);
        final PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(privateKeyBytes);
        final KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        final PrivateKey privateKey = keyFactory.generatePrivate(keySpec);

        return (RSAPrivateKey) privateKey;
    }
}
