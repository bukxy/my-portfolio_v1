package com.peron_nicolas.portfolio.dto.skill;

import com.peron_nicolas.portfolio.entity.Skill;
import org.springframework.stereotype.Component;

@Component
public class SkillMapper {

    // DTO -> Entity (create)
    public Skill toEntity(SkillDTO dto) {
        return new Skill(dto.name(), dto.percentage().byteValue());
    }

    // DTO -> Entity (update)
    public Skill toEntity(SkillDTO dto, Skill skill) {
        skill.setName(dto.name());
        skill.setPercentage(dto.percentage().byteValue());
        return skill;
    }

    // Entity -> DTO (response)
    public SkillDTO toDto(Skill skill) {
        return new SkillDTO(skill.getName(), skill.getPercentage().byteValue());
    }
}