package com.peron_nicolas.portfolio.dto.image;

import com.peron_nicolas.portfolio.entity.Image;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ImageMapper {

    @Value("${back.url}")
    private String backUrl;

    public ImageDTO toDto(Image image) {
        return new ImageDTO(image.getId(), backUrl + image.getPath());
    }

    public List<ImageDTO> toDto(List<Image> images) {
        return images.stream().map(this::toDto).toList();
    }
}