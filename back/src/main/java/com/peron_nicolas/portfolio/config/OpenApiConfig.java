package com.peron_nicolas.portfolio.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

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
                ));

//                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
//                .components(new Components()
//                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
//                                .name("bearerAuth")
//                                .type(SecurityScheme.Type.HTTP)
//                                .scheme("bearer")
//                                .bearerFormat("JWT")));
    }
}