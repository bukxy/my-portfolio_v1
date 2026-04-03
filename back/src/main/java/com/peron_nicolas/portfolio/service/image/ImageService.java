package com.peron_nicolas.portfolio.service.image;

import com.peron_nicolas.portfolio.dto.image.ImageDTO;
import com.peron_nicolas.portfolio.dto.image.ImageMapper;
import com.peron_nicolas.portfolio.entity.Image;
import com.peron_nicolas.portfolio.enums.EntityTypeEnum;
import com.peron_nicolas.portfolio.repository.ImageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService implements ImageServiceInterface {

    private final ImageRepository imageRepository;

    @Override
    public Image save(String path, EntityTypeEnum entityTypeEnum, Long entityId) {

        try {
            Image image = new Image();
            image.setEntityId(entityId);
            image.setEntityType(entityTypeEnum);
            image.setPath(path);

            imageRepository.save(image);

            return image;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public List<Image> findByEntityTypeAndEntityId(EntityTypeEnum entityTypeEnum, Long entityId) {
        return imageRepository.findByEntityTypeAndEntityId(entityTypeEnum, entityId);
    }

    @Override
    public List<Image> findByEntityType(EntityTypeEnum entityTypeEnum) {
        return imageRepository.findByEntityType(entityTypeEnum);
    }

    @Override
    @Transactional
    public void deleteByEntityTypeAndEntityId(EntityTypeEnum entityTypeEnum, Long entityId) {
        imageRepository.deleteByEntityTypeAndEntityId(entityTypeEnum, entityId);
    }
}
