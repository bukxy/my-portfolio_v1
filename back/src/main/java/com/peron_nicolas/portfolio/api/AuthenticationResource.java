package com.peron_nicolas.portfolio.api;

import com.peron_nicolas.portfolio.entity.User;
import com.peron_nicolas.portfolio.repository.UserRepository;
import com.peron_nicolas.portfolio.security.JwtUtil;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@Hidden
@RequiredArgsConstructor
public class AuthenticationResource {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody User user, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        JwtUtil.AuthResponse authResponse = jwtUtils.generateToken(userDetails.getUsername());

        ResponseCookie cookie = ResponseCookie.from("accessToken", authResponse.jwtToken())
                .httpOnly(true)
                .secure(true)       // false en local, true en prod
                .sameSite("Strict")
                .path("/")
                .maxAge(86400)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(Map.of("success", true));
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
    public ResponseEntity<?> signout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("accessToken", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)  // expire immédiatement
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(Map.of("success", true));
    }
}
