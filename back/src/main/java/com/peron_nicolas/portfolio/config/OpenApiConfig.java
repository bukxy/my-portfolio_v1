package com.peron_nicolas.portfolio.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Locale;

@Configuration
public class OpenApiConfig {

    @Autowired
    private MessageSource messageSource;

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Portfolio API")
                        .description("Test API REST Java application")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Nicolas Peron")
                                .url("https://peron-nicolas.com"))
                )
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Développement local"),
                        new Server()
                                .url("https://api-portfolio-v1.peron-nicolas.com")
                                .description("Production")
                ))
                .components(new Components()
                        .addResponses("404", new ApiResponse()
                                .description(messageSource.getMessage("handler.error.not.found", null, Locale.getDefault())))
                        .addResponses("401", new ApiResponse()
                                .description(messageSource.getMessage("handler.error.unauthorized", null, Locale.getDefault())))
                        .addResponses("500", new ApiResponse()
                                .description(messageSource.getMessage("handler.error.internal.server", null, Locale.getDefault())))
                        .addResponses("409", new ApiResponse()
                                .description(messageSource.getMessage("handler.error.conflict", null, Locale.getDefault())))
                        .addResponses("400", new ApiResponse()
                                .description(messageSource.getMessage("handler.error.bad.request", null, Locale.getDefault()))));

//                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
//                .components(new Components()
//                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
//                                .name("bearerAuth")
//                                .type(SecurityScheme.Type.HTTP)
//                                .scheme("bearer")
//                                .bearerFormat("JWT")));
    }
}