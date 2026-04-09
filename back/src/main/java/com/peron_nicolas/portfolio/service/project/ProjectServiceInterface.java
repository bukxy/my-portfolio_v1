package com.peron_nicolas.portfolio.service.project;

import com.peron_nicolas.portfolio.entity.Project;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProjectServiceInterface {
    Project save(Project projectEntity);

    @Transactional
    List<Project> findWithFilters(List<Long> categoryIds, List<Long> skillIds);

    Project getById(Long id);
    void deleteById(Long id);
}
