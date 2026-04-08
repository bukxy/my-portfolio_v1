package com.peron_nicolas.portfolio.dto.category;

import jakarta.validation.constraints.NotNull;

public record CategoryDTO(
    Long id,

    @NotNull
    String name
) {}