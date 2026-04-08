package com.peron_nicolas.portfolio.service.category;

import com.peron_nicolas.portfolio.entity.Category;
import com.peron_nicolas.portfolio.entity.Skill;
import com.peron_nicolas.portfolio.repository.CategoryRepository;
import com.peron_nicolas.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService implements CategoryServiceInterface {

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getById(Long category_id) {
        return categoryRepository.findById(category_id).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

}
