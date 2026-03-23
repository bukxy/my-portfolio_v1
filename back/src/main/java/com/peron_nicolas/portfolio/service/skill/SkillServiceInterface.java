package com.peron_nicolas.portfolio.service.skill;

import com.peron_nicolas.portfolio.entity.Skill;

public interface SkillServiceInterface {
    Skill save(Skill skillEntity);
    Iterable<Skill> findAll();
    Skill getById(Long id);
    void deleteById(Long id);
}
