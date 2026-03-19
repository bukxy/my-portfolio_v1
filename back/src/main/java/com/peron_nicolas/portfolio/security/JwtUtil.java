package com.peron_nicolas.portfolio.security;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@Slf4j
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    private SecretKey key;

    @PostConstruct
    public void init() {
//        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public record AuthResponse(@JsonProperty("access_token") String jwtToken, @JsonProperty("refresh_token") String jwtRefreshToken) {}
    /*
    Remplace
    ----------
    public class AuthResponse {
        private final String jwtToken;

        public AuthResponse(String jwtToken) {
            this.jwtToken = jwtToken;
        }

        public String getJwtToken() {
            return jwtToken;
        }
    }
     */
    public AuthResponse generateTokens(String username) {
        String accessToken = generateAccessToken(username);  // 15min
        String refreshToken = generateRefreshToken(username); // 7 jours
        return new AuthResponse(accessToken, refreshToken);
    }

    public String generateAccessToken(String username) {
        String token = Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(key)
                .compact();

        return token;
    }

    private String generateRefreshToken(String username) {
        String token = Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
                .signWith(key)
                .compact();

        return token;
    }

    public String getUserFromToken(String token) {
        return Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        }
        return false;
    }

}
