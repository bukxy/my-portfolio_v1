package com.peron_nicolas.portfolio.service.skill;

import com.peron_nicolas.portfolio.entity.Skill;
import com.peron_nicolas.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SkillService implements SkillServiceInterface {

    private final SkillRepository skillRepository;

    @Transactional
    public Skill save(Skill entity) {
        return skillRepository.save(entity);
    }

    @Override
    public Iterable<Skill> findAll() {
        return skillRepository.findAllByOrderByPercentageDesc();
    }

    @Override
    public Skill getById(Long id) {
        Optional<Skill> optionalSkill = skillRepository.findById(id);
        if (optionalSkill.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        Skill skill = optionalSkill.get();

        return skill;
    }

    @Override
    public void deleteById(Long id) {
        if (!skillRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        skillRepository.deleteById(id);
    }

}
