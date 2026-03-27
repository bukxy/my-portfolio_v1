package com.peron_nicolas.portfolio.dto.project;

import com.peron_nicolas.portfolio.dto.image.ImageDTO;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record ProjectDTO(

    Long id,

    @NotBlank(message = "Name is required")
    String name,

    String url,

    @NotNull(message = "isGithub is required")
    Boolean isGithub,

    @Nullable
    String description,

    @NotNull(message = "Date start is required")
    LocalDate dateStart,

    LocalDate dateEnd,

    List<ImageDTO> images
) {}