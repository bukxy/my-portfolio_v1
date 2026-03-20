package com.peron_nicolas.portfolio.api;

import com.peron_nicolas.portfolio.entity.User;
import com.peron_nicolas.portfolio.repository.UserRepository;
import com.peron_nicolas.portfolio.security.JwtUtil;
import com.peron_nicolas.portfolio.tools.MessageTool;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Hidden
@RequiredArgsConstructor
public class AuthenticationResource {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtils;

    private final MessageTool messageTool;

    @Value("${cookie.domain}")
    private String cookieDomain;

    @Value("${cookie.secure}")
    private boolean cookieSecure;

    @Value("${jwt.refresh-token-path}")
    private String refreshTokenPath;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody User user, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        ResponseCookie cookie = ResponseCookie.from("refresh_token", jwtUtils.generateRefreshToken(userDetails.getUsername()))
                .httpOnly(true)
                .secure(cookieSecure)       // false en local, true en prod
                .sameSite("Strict")
                .path(refreshTokenPath)
                .domain(cookieDomain)
                .maxAge(60 * 60 * 24 * 7)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(Map.of(
                "access_token", jwtUtils.generateAccessToken(userDetails.getUsername()),
                "message", messageTool.set("auth.success.logged.in.message")
        ));
    }

    // Bloque la création d'un compte utilisateur, car pas besoin :)
//    @PostMapping("/signup")
//    public ResponseEntity<String> registerUser(@RequestBody User user) {
//        if (userRepository.existsByUsername(user.getUsername())) {
//            return ResponseEntity.badRequest().build();
//        }
//
//        final User newUser = new User(
//                null,
//                user.getUsername(),
//                encoder.encode(user.getPassword())
//        );
//        userRepository.save(newUser);
//        return ResponseEntity.ok("User registered successfully!");
//    }

    @PostMapping("/signout")
    public ResponseEntity<?> signout(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        boolean hasToken = cookies != null && Arrays.stream(cookies)
                .anyMatch(c -> c.getName().equals("refresh_token"));

        if (!hasToken)
            return ResponseEntity.badRequest().body(Map.of("message", messageTool.set("auth.already.logged.out.message")));
        else {
            ResponseCookie cookie = ResponseCookie.from("refresh_token", "")
                    .httpOnly(true)
                    .secure(cookieSecure)
                    .path(refreshTokenPath)
                    .domain(cookieDomain)
                    .maxAge(0)
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        }

        return ResponseEntity.ok(Map.of(
                "message", messageTool.set("auth.success.logged.out.message")
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", messageTool.set("auth.already.logged.out.message")));
        }

        String refreshToken = Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals("refresh_token"))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);

        if (refreshToken == null || !jwtUtils.validateJwtToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", messageTool.set("auth.already.logged.out.message")));
        }

        String username = jwtUtils.getUserFromToken(refreshToken);
        String newAccessToken = jwtUtils.generateAccessToken(username);

        return ResponseEntity.ok(Map.of("access_token", newAccessToken));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", messageTool.set("auth.not.logged.in.message")));

        return ResponseEntity.ok(Map.of("username", authentication.getName()));
    }
}
