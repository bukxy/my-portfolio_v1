package com.peron_nicolas.portfolio.service.FileSystemStorage;

import com.peron_nicolas.portfolio.entity.Image;
import com.peron_nicolas.portfolio.enums.EntityTypeEnum;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface FileSystemStorageServiceInterface {

    void init();

    Image store(MultipartFile file, EntityTypeEnum entityTypeEnum, Long entityId);

    Stream<Path> loadAll();

    Path load(String filename);

    Resource loadAsResource(String filename);

    void deleteAll();
}
