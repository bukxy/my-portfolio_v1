package com.peron_nicolas.portfolio.dto.skill;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SkillDTO(
    Long id,

    @NotBlank(message = "Name is required")
    String name,

    @NotNull(message = "Percentage is required")
    @Min(value = 0, message = "Percentage must be between 0 and 100")
    @Max(value = 100, message = "Percentage must be between 0 and 100")
    Byte percentage
) {}
