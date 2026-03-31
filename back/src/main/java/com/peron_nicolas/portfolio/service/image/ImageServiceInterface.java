package com.peron_nicolas.portfolio.service.image;

import com.peron_nicolas.portfolio.entity.Image;
import com.peron_nicolas.portfolio.enums.EntityTypeEnum;

import java.util.List;

public interface ImageServiceInterface {
    Image save (String path, EntityTypeEnum entityTypeEnum, Long entityId);
    List<Image> findByEntityTypeAndEntityId (EntityTypeEnum entityTypeEnum, Long entityId);

    List<Image> findByEntityType (EntityTypeEnum entityTypeEnum);

    void deleteByEntityTypeAndEntityId (EntityTypeEnum entityTypeEnum, Long entityId);
}
