package com.peron_nicolas.portfolio.service.project;

import com.peron_nicolas.portfolio.entity.Project;
import com.peron_nicolas.portfolio.enums.EntityTypeEnum;
import com.peron_nicolas.portfolio.repository.ProjectRepository;
import com.peron_nicolas.portfolio.service.image.ImageServiceInterface;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.util.Base64;
import java.util.List;
import java.util.Map;

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
    @Transactional
    public List<Project> findWithFilters(List<Long> categoryIds, List<Long> skillIds) {
        return projectRepository.findWithFilters(categoryIds, skillIds);
    }

    @Override
    @Transactional
    public Project getById(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
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
            Map response = restClient.get()
                    .uri(apiUrl)
                    .header("Accept", "application/vnd.github+json")
                    .retrieve()
                    .body(Map.class);

            if (response != null && response.get("content") != null) {
                String encoded = ((String) response.get("content")).replaceAll("\\s", "");
                return new String(Base64.getDecoder().decode(encoded));
            }
            return null;
        } catch (Exception e) {
            log.error("fetchReadme error: {}", e.getMessage(), e);
            return null;
        }
    }

}
