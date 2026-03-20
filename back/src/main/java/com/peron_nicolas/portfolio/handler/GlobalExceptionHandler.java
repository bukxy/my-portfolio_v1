package com.peron_nicolas.portfolio.handler;

import com.peron_nicolas.portfolio.tools.MessageTool;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.springframework.http.HttpStatus.*;

@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final MessageTool messageTool;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(Map.of("errors",errors));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<?> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest()
                .body(Map.of("message", "Invalid parameter: " + ex.getName()));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
        String field = "unknown";
        String causeMessage = ex.getCause() != null ? ex.getCause().getMessage() : "";

        // Get key name
        Matcher fieldMatcher = Pattern.compile("\\[\"(.+?)\"]").matcher(causeMessage);
        if (fieldMatcher.find()) {
            field = fieldMatcher.group(1);
        }

        // Get type wanted
        String exMessage = ex.getMessage() != null ? ex.getMessage() : "";
        String expectedType = "unknown";
        Matcher typeMatcher = Pattern.compile("of `(.+?)`").matcher(exMessage);
        if (typeMatcher.find()) {
            expectedType = typeMatcher.group(1);
        }

        return ResponseEntity.badRequest()
                .body((Map.of(field, messageTool.set("validation.invalid.type") + " (" + expectedType + ")")));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrity(DataIntegrityViolationException ex) {
        String message = ex.getMessage();

        if (message.contains("unique") || message.contains("duplicate")) {
            String field = "unknown";
            Matcher matcher = Pattern.compile("Key \\((.+?)\\)").matcher(message);
            if (matcher.find()) {
                field = matcher.group(1);
            }
            return ResponseEntity.badRequest()
                    .body((Map.of(field, "Value must be unique")));
        }

        return ResponseEntity.badRequest()
                .body(Map.of("message", "Data integrity violation"));
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<?> handleResponseStatus(ResponseStatusException ex) {

        String message;

        switch (ex.getStatusCode()) {
            case NOT_FOUND -> {
                message = messageTool.set("handler.error.not.found");
            }
            case FORBIDDEN -> {
                message = messageTool.set("handler.error.forbidden");
            }
            case CONFLICT -> {
                message = messageTool.set("handler.error.conflict");
            }
            case INTERNAL_SERVER_ERROR -> {
                message = messageTool.set("handler.error.internal.server");
            }
            default -> {
                message = messageTool.set("handler.error.bad.request");
            }
        }

        return ResponseEntity.status(ex.getStatusCode())
                .body(Map.of("message", message));
    }
}
