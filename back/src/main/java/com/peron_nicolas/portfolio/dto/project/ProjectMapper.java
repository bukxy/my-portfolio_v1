package com.peron_nicolas.portfolio.dto.project;

import com.peron_nicolas.portfolio.dto.image.ImageMapper;
import com.peron_nicolas.portfolio.entity.Image;
import com.peron_nicolas.portfolio.entity.Project;
import com.peron_nicolas.portfolio.enums.EntityTypeEnum;
import com.peron_nicolas.portfolio.service.image.ImageServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ProjectMapper {

    private final ImageMapper imageMapper;
    private final ImageServiceInterface imageServiceInterface;

    public Project toEntity(ProjectDTO dto) {
        return new Project(dto.name(), dto.url(), dto.isGithub(), dto.description());
    }

    public Project toEntity(ProjectDTO dto, Project p) {
        p.setName(dto.name());
        p.setUrl(dto.url());
        p.setDescription(dto.description());
        p.setIsGithub(dto.isGithub());
        return p;
    }

    public ProjectDTO toDto(Project p, List<Image> images) {
        return new ProjectDTO(
                p.getId(),
                p.getName(),
                p.getUrl(),
                p.getIsGithub(),
                p.getDescription(),
                imageMapper.toDto(images)
        );
    }

    public List<ProjectDTO> toDto(List<Project> ps, List<Image> images) {
        return ps.stream()
                .map(p -> toDto(p, images.stream()
                        .filter(i -> i.getEntityId().equals(p.getId()))
                        .toList()))
                .toList();
    }

    public ProjectDTO toDto(Project p) {
        List<Image> images = imageServiceInterface.findByEntityTypeAndEntityId(EntityTypeEnum.PROJECT, p.getId());
        return toDto(p, images);
    }

    public List<ProjectDTO> toDto(List<Project> ps) {
        return ps.stream()
                .map(this::toDto)
                .toList();
    }
}