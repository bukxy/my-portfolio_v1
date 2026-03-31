package com.peron_nicolas.portfolio.service.project;

import com.peron_nicolas.portfolio.entity.Project;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectServiceInterface {
    Project save(Project projectEntity);
    List<Project> findAll();
    Project getById(Long id);
    void deleteById(Long id);
}
