package com.peron_nicolas.portfolio.service.project;

import com.peron_nicolas.portfolio.entity.Project;
import com.peron_nicolas.portfolio.enums.EntityTypeEnum;
import com.peron_nicolas.portfolio.repository.ProjectRepository;
import com.peron_nicolas.portfolio.service.image.ImageService;
import com.peron_nicolas.portfolio.service.image.ImageServiceInterface;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectService implements ProjectServiceInterface {

    private final ProjectRepository projectRepository;

    private final RestClient restClient;
    private final ImageServiceInterface imageServiceInterface;

    @Transactional
    public Project save(Project entity) {
        if (Boolean.TRUE.equals(entity.getIsGithub()) && entity.getUrl() != null) {
            String readmeContent = fetchReadme(entity.getUrl());
            entity.setDescription(readmeContent);
        }

        Project project = projectRepository.save(entity);

        return project;
    }

    @Override
    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    @Override
    public Project getById(Long id) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        Project project = optionalProject.get();

        return project;
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        imageServiceInterface.deleteByEntityTypeAndEntityId(EntityTypeEnum.PROJECT, id);
        projectRepository.deleteById(id);
    }

    private String fetchReadme(String githubUrl) {
        String repo = githubUrl.replace("https://github.com/", "");
        String apiUrl = "https://api.github.com/repos/" + repo + "/readme";

        try {
            return restClient.get()
                    .uri(apiUrl)
                    .header("Accept", "application/vnd.github.raw+json")
                    .retrieve()
                    .body(String.class);
        } catch (Exception e) {
            return null;
        }
    }

}
