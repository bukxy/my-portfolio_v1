package com.peron_nicolas.portfolio.repository;

import com.peron_nicolas.portfolio.entity.Category;
import com.peron_nicolas.portfolio.entity.Image;
import com.peron_nicolas.portfolio.enums.EntityTypeEnum;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
