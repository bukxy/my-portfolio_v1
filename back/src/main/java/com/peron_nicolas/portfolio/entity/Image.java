package com.peron_nicolas.portfolio.entity;

import com.peron_nicolas.portfolio.enums.EntityTypeEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@DiscriminatorValue("IMG")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String path;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EntityTypeEnum entityType;

    @Column(nullable = false)
    private Long entityId;

    public Image(String path, EntityTypeEnum entityType, Long entityId){
        this.setPath(path);
        this.setEntityType(entityType);
        this.setEntityId(entityId);
    }

    public Image() {}
}
