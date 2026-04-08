package com.peron_nicolas.portfolio.dto.project;

import com.peron_nicolas.portfolio.dto.image.ImageMapper;
import com.peron_nicolas.portfolio.dto.skill.SkillDTO;
import com.peron_nicolas.portfolio.entity.Category;
import com.peron_nicolas.portfolio.entity.Image;
import com.peron_nicolas.portfolio.entity.Project;
import com.peron_nicolas.portfolio.entity.Skill;
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

    public Project toEntity(ProjectCreateDTO dto, List<Skill> skills, Category category) {
        Project project = new Project(dto.name(), dto.url(), dto.isGithub(), dto.description(), dto.shortDescription(), dto.dateStart(), dto.dateEnd(), category);
        project.setSkills(skills);
        return project;
    }

    public Project toEntity(ProjectCreateDTO dto, Project p, List<Skill> skills, Category category) {
        p.setName(dto.name());
        p.setUrl(dto.url());
        p.setIsGithub(dto.isGithub());
        p.setDescription(dto.description());
        p.setShortDescription(dto.shortDescription());
        p.setDateStart(dto.dateStart());
        p.setDateEnd(dto.dateEnd());
        p.setCategory(category);
        p.setSkills(skills);
        return p;
    }

    public ProjectDTO toDto(Project p, List<Image> images) {
        return new ProjectDTO(
                p.getId(),
                p.getName(),
                p.getUrl(),
                p.getIsGithub(),
                p.getDescription(),
                p.getShortDescription(),
                p.getDateStart(),
                p.getDateEnd(),
                p.getCategory(),
                imageMapper.toDto(images),
                p.getSkills().stream()
                        .map(s -> new SkillDTO(s.getId(), s.getName(), s.getPercentage()))
                        .toList()
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