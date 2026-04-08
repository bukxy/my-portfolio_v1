package com.peron_nicolas.portfolio.api;

import com.peron_nicolas.portfolio.dto.category.CategoryMapper;
import com.peron_nicolas.portfolio.service.category.CategoryServiceInterface;
import com.peron_nicolas.portfolio.tools.MessageTool;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryResource {

	private final CategoryServiceInterface categoryServiceInterface;
	private final MessageTool messageTool;
	private final CategoryMapper categoryMapper;

	@GetMapping
	public ResponseEntity<?> list() {
		return messageTool.res(HttpStatus.OK,
				categoryMapper.toDto(categoryServiceInterface.findAll()),
				"crud.success.retrieved.message", "Category"
		);
	}
}

