package com.peron_nicolas.portfolio.dto.image;

import com.peron_nicolas.portfolio.entity.Image;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ImageMapper {

    public ImageDTO toDto(Image image) {
        return new ImageDTO(image.getId(), image.getPath());
    }

    public List<ImageDTO> toDto(List<Image> images) {
        return images.stream().map(this::toDto).toList();
    }
}