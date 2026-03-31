package com.peron_nicolas.portfolio.dto.image;

import jakarta.validation.constraints.NotNull;

public record ImageDTO(
    Long id,

    @NotNull
    String path
) {}