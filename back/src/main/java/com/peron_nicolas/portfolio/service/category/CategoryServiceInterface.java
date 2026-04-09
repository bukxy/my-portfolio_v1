package com.peron_nicolas.portfolio.service.category;

import com.peron_nicolas.portfolio.entity.Category;

import java.util.List;

public interface CategoryServiceInterface {
    List<Category> findAll();
    Category getById(Long category_id);
}
