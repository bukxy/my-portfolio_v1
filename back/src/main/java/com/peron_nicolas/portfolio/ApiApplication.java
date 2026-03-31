package com.peron_nicolas.portfolio;

import com.peron_nicolas.portfolio.service.FileSystemStorage.FileSystemStorageServiceInterface;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@ConfigurationProperties("messages")
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	@Bean
	CommandLineRunner init(FileSystemStorageServiceInterface storageService) {
		return (args) -> {
//			storageService.deleteAll();
			storageService.init();
		};
	}
}
