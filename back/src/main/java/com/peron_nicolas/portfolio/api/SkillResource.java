package com.peron_nicolas.portfolio.api;

import com.peron_nicolas.portfolio.dto.skill.SkillDTO;
import com.peron_nicolas.portfolio.dto.skill.SkillMapper;
import com.peron_nicolas.portfolio.entity.Skill;
import com.peron_nicolas.portfolio.service.skill.SkillServiceInterface;
import com.peron_nicolas.portfolio.tools.MessageTool;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/skill")
@RequiredArgsConstructor
@ApiResponses({
        @ApiResponse(responseCode = "404", ref = "#/components/responses/404"),
        @ApiResponse(responseCode = "401", ref = "#/components/responses/401"),
        @ApiResponse(responseCode = "500", ref = "#/components/responses/500"),
        @ApiResponse(responseCode = "409", ref = "#/components/responses/409"),
        @ApiResponse(responseCode = "400", ref = "#/components/responses/400")
})
public class SkillResource {

    private final SkillServiceInterface skillServiceInterface;

    private final MessageTool messageTool;
    private final SkillMapper skillMapper;

    private final SkillMapper mapper;

    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody SkillDTO request) {
        Skill skill = mapper.toEntity(request);

        return messageTool.res(HttpStatus.CREATED,
                skillMapper.toDto(skillServiceInterface.save(skill)),
                "crud.success.created.message", "Skill"
        );
    }

    @GetMapping
    public ResponseEntity<?> list() {
        return messageTool.res(HttpStatus.CREATED,
                skillMapper.toDto((List<Skill>) skillServiceInterface.findAll()),
                "crud.success.retrieved.message", "Skill"
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return messageTool.res(HttpStatus.CREATED,
                skillMapper.toDto(skillServiceInterface.getById(id)),
                "crud.success.retrieved.message", "Skill"
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@PathVariable Long id, @Valid @RequestBody SkillDTO request) {
        System.out.println("Received: " + request);
        Skill skill = mapper.toEntity(request, skillServiceInterface.getById(id));
        return messageTool.res(HttpStatus.OK,
                skillMapper.toDto(skillServiceInterface.save(skill)),
                "crud.success.updated.message", "Skill"
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        skillServiceInterface.deleteById(id);

        return ResponseEntity.ok(Map.of("message", messageTool.set("crud.success.deleted.message", "Skill")));
    }
}
