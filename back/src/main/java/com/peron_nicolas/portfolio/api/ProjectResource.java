package com.peron_nicolas.portfolio.api;

import com.peron_nicolas.portfolio.dto.project.ProjectDTO;
import com.peron_nicolas.portfolio.dto.project.ProjectMapper;
import com.peron_nicolas.portfolio.entity.Image;
import com.peron_nicolas.portfolio.entity.Project;
import com.peron_nicolas.portfolio.enums.EntityTypeEnum;
import com.peron_nicolas.portfolio.repository.ProjectRepository;
import com.peron_nicolas.portfolio.service.FileSystemStorage.FileSystemStorageServiceInterface;
import com.peron_nicolas.portfolio.service.image.ImageServiceInterface;
import com.peron_nicolas.portfolio.service.project.ProjectServiceInterface;
import com.peron_nicolas.portfolio.tools.MessageTool;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/project")
@RequiredArgsConstructor
@ApiResponses({
        @ApiResponse(responseCode = "404", ref = "#/components/responses/404"),
        @ApiResponse(responseCode = "401", ref = "#/components/responses/401"),
        @ApiResponse(responseCode = "500", ref = "#/components/responses/500"),
        @ApiResponse(responseCode = "409", ref = "#/components/responses/409"),
        @ApiResponse(responseCode = "400", ref = "#/components/responses/400")
})
public class ProjectResource {

    private final ProjectServiceInterface projectServiceInterface;

    private final MessageTool messageTool;
    private final ProjectMapper projectMapper;

    private final FileSystemStorageServiceInterface fileSystemStorageServiceInterface;
    private final ImageServiceInterface imageServiceInterface;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> save(@Valid @RequestPart("data") ProjectDTO request, @RequestPart(value = "images", required = false) List<MultipartFile> images){

        Project p = projectMapper.toEntity(request);
        Project project = projectServiceInterface.save(p);

        List<Image> savedImages = new ArrayList<>();
        if (images != null && !images.isEmpty()) {
            savedImages = images.stream().map(file -> {
                Image image = fileSystemStorageServiceInterface.store(file, EntityTypeEnum.PROJECT, project.getId());
                return image;
            }).toList();
        }

        return messageTool.res(HttpStatus.CREATED,
                projectMapper.toDto(project, savedImages),
                "crud.success.retrieved.message", "Project"
        );
    }

    @GetMapping
    public ResponseEntity<?> list() {
        List<Project> projects = projectServiceInterface.findAll();
        List<Image> images = imageServiceInterface.findByEntityType(EntityTypeEnum.PROJECT);

        return messageTool.res(HttpStatus.OK,
                projectMapper.toDto(projects, images),
                "crud.success.retrieved.message", "Project"
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        Project project = projectServiceInterface.getById(id);
        List<Image> images = imageServiceInterface.findByEntityTypeAndEntityId(EntityTypeEnum.PROJECT, id);

        return messageTool.res(HttpStatus.OK,
                projectMapper.toDto(project, images),
                "crud.success.retrieved.message", "Project"
        );
    }

    @PutMapping(path="/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> edit(@PathVariable Long id, @Valid @RequestPart("data") ProjectDTO request, @RequestPart(value = "images", required = false) List<MultipartFile> images) {

        Project p = projectMapper.toEntity(request, projectServiceInterface.getById(id));
        Project project = projectServiceInterface.save(p);

        List<Image> savedImages = new ArrayList<>();
        if (images != null && !images.isEmpty()) {
            imageServiceInterface.deleteByEntityTypeAndEntityId(EntityTypeEnum.PROJECT, id);
            savedImages = images.stream().map(file -> {
                Image image = fileSystemStorageServiceInterface.store(file, EntityTypeEnum.PROJECT, project.getId());
                return image;
            }).toList();
        }

        return messageTool.res(HttpStatus.OK,
                projectMapper.toDto(project, savedImages),
                "crud.success.updated.message", "Project"
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        projectServiceInterface.deleteById(id);
        return messageTool.res(HttpStatus.OK,
                null,
                "crud.success.deleted.message", "Project"
        );
    }
}
