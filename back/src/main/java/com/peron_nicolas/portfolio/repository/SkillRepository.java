package com.peron_nicolas.portfolio.repository;

import com.peron_nicolas.portfolio.entity.Skill;
import com.peron_nicolas.portfolio.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findAllByOrderByPercentageDesc();
}
