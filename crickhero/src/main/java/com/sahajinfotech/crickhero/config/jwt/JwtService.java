package com.sahajinfotech.crickhero.config.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;

/**
 * JwtService - Service for JWT token operations
 * 
 * This service handles:
 * - JWT token generation
 * - Token validation
 * - Username extraction from tokens
 * - Token expiration checking
 */
@Service
public class JwtService {
    private static String secretKey;

    /**
     * Constructor initializes the secret key using HmacSHA256 algorithm
     * 
     * The secret key is generated once and stored statically to ensure consistency
     * across token operations.
     */
    public JwtService() {
        try {
            KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA256");
            SecretKey secretKey1 = keyGenerator.generateKey();
            secretKey = Base64.getEncoder().encodeToString(secretKey1.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Failed to initialize JWT secret key", e);
        }
    }

    /**
     * Generates a JWT token for the given email
     * 
     * @param email The email to include in the token
     * @return Generated JWT token
     */
    public String generateToken(String email) {
        HashMap<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date((System.currentTimeMillis() + 3600*1000)))
                .and()
                .signWith(getSecretKey())
                .compact();
    }

    /**
     * Creates and returns the secret key for signing tokens
     * 
     * @return Key object for signing JWT tokens
     */
    private Key getSecretKey() {
        byte[] keyBytes = Decoders.BASE64.decode((CharSequence) secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Extracts the username (email) from a JWT token
     * 
     * @param token JWT token to extract from
     * @return Extracted username (email)
     */
    public String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    /**
     * Validates a JWT token against user details
     * 
     * @param token JWT token to validate
     * @param userDetails UserDetails object to validate against
     * @return true if token is valid, false otherwise
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        String email = userDetails.getUsername();
        return (username.equals(email) && !isTokenExpired(token));
    }

    /**
     * Checks if a JWT token is expired
     * 
     * @param token JWT token to check
     * @return true if token is expired, false otherwise
     */
    private boolean isTokenExpired(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration()
                .before(new Date());
    }
}
