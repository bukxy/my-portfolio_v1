package com.peron_nicolas.portfolio.repository;

import com.peron_nicolas.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
	@Query("SELECT DISTINCT p FROM Project p " +
			"LEFT JOIN p.skills s " +
			"WHERE (:#{#categoryIds == null || #categoryIds.isEmpty()} = true OR p.category.id IN :categoryIds) " +
			"AND (:#{#skillIds == null || #skillIds.isEmpty()} = true OR s.id IN :skillIds) " +
			"ORDER BY p.dateStart DESC")
	List<Project> findWithFilters(
			@Param("categoryIds") List<Long> categoryIds,
			@Param("skillIds") List<Long> skillIds
	);
}
