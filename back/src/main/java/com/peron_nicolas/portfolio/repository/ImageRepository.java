package com.peron_nicolas.portfolio.repository;

import com.peron_nicolas.portfolio.entity.Image;
import com.peron_nicolas.portfolio.enums.EntityTypeEnum;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByEntityTypeAndEntityId (EntityTypeEnum entityTypeEnum, Long EntityId);
    List<Image> findByEntityType (EntityTypeEnum entityTypeEnum);

    @Transactional
    void deleteByEntityTypeAndEntityId (EntityTypeEnum entityTypeEnum, Long EntityId);
}
