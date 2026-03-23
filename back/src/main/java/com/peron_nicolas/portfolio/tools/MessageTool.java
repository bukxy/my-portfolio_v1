package com.peron_nicolas.portfolio.tools;

import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MessageTool {

    private final MessageSource messageSource;

    public String set(String messageKey, Object... args) {
        return messageSource.getMessage(messageKey, args, LocaleContextHolder.getLocale());
    }

    public ResponseEntity<?> res(HttpStatus HttpStatusCode, Object data, String messageKey, Object... args) {
        return ResponseEntity.status(HttpStatusCode).body(Map.of(
                "message", messageSource.getMessage(messageKey, args, LocaleContextHolder.getLocale()),
                "data", data
        ));
    }
}
