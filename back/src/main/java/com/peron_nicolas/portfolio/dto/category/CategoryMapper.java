package com.peron_nicolas.portfolio.dto.category;

import com.peron_nicolas.portfolio.entity.Category;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryMapper {

    public CategoryDTO toDto(Category category) {
        return new CategoryDTO(category.getId(), category.getName());
    }

    public List<CategoryDTO> toDto(List<Category> categories) {
        return categories.stream().map(this::toDto).toList();
    }
}