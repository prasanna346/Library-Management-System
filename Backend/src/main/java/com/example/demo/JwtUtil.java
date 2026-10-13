package com.example.demo;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET_KEY = "LMS_SECRET_KEY_SUPER_SECURE_LIBRARY_MANAGEMENT_2026";
    private static final long EXPIRATION_TIME = 86400000L; // 24 hours in milliseconds

    public static String generateToken(String username, String role) {
        long now = System.currentTimeMillis();
        long exp = now + EXPIRATION_TIME;

        String header = Base64.getUrlEncoder().withoutPadding().encodeToString("{\"alg\":\"HS256\",\"typ\":\"JWT\"}".getBytes(StandardCharsets.UTF_8));
        String payloadJson = String.format("{\"sub\":\"%s\",\"role\":\"%s\",\"iat\":%d,\"exp\":%d}", username, role, now / 1000, exp / 1000);
        String payload = Base64.getUrlEncoder().withoutPadding().encodeToString(payloadJson.getBytes(StandardCharsets.UTF_8));

        String signature = sign(header + "." + payload, SECRET_KEY);
        return header + "." + payload + "." + signature;
    }

    public static boolean validateToken(String token) {
        if (token == null || !token.contains(".")) return false;
        String[] parts = token.split("\\.");
        if (parts.length != 3) return false;

        String expectedSignature = sign(parts[0] + "." + parts[1], SECRET_KEY);
        if (!expectedSignature.equals(parts[2])) return false;

        try {
            String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            if (payloadJson.contains("\"exp\":")) {
                int expIdx = payloadJson.indexOf("\"exp\":") + 6;
                int endIdx = payloadJson.indexOf("}", expIdx);
                if (endIdx == -1) endIdx = payloadJson.indexOf(",", expIdx);
                long exp = Long.parseLong(payloadJson.substring(expIdx, endIdx).trim());
                if (System.currentTimeMillis() / 1000 > exp) {
                    return false; // Expired
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static String extractUsername(String token) {
        try {
            String[] parts = token.split("\\.");
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            int subIdx = payload.indexOf("\"sub\":\"") + 7;
            int endIdx = payload.indexOf("\"", subIdx);
            return payload.substring(subIdx, endIdx);
        } catch (Exception e) {
            return null;
        }
    }

    public static String extractRole(String token) {
        try {
            String[] parts = token.split("\\.");
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            int roleIdx = payload.indexOf("\"role\":\"") + 8;
            int endIdx = payload.indexOf("\"", roleIdx);
            return payload.substring(roleIdx, endIdx);
        } catch (Exception e) {
            return "MEMBER";
        }
    }

    private static String sign(String data, String secret) {
        try {
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256Hmac.init(secretKey);
            byte[] signedBytes = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(signedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error signing JWT", e);
        }
    }
}
