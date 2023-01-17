package com.example.spring.controllers;

import DTO.EmptyJSON;
import DTO.CustomFieldError;
import DTO.FieldErrorResponse;
import DTO.RecipeDTO;
import com.example.spring.models.Category;
import com.example.spring.models.Difficulty;
import com.example.spring.models.Recipe;
import com.example.spring.services.CategoryService;
import com.example.spring.services.DifficultyService;
import com.example.spring.services.RecipeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private DifficultyService difficultyService;
    @Autowired
    private RecipeService recipeService;

    private final ModelMapper modelMapper = new ModelMapper();
    @PostMapping("/create")
    public ResponseEntity<Object> createRecipe (@Valid @RequestBody Recipe recipe, BindingResult result){
        if(result.hasErrors()){
            var List = result.getFieldErrors().stream().
                    map(f->new CustomFieldError(f.getField(), f.getDefaultMessage())).
                    collect(Collectors.toList());
            FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
            fieldErrorResponse.setFieldErrors(List);

            return new ResponseEntity(fieldErrorResponse, HttpStatus.NOT_ACCEPTABLE);
        }

        recipeService.createRecipe(recipe);

        return new ResponseEntity(new EmptyJSON("ok"),  HttpStatus.OK);


    }
    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

    @GetMapping("/difficulty")
    public List<Difficulty> getDifficultyLevels(){
        return  difficultyService.getDifficultyLevels();
    }

    @PostMapping(value = "/uploadFile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadFile(@RequestParam MultipartFile file) {
        System.out.println(file.getName());
        System.out.println(file.isEmpty());
        System.out.println(file.getContentType());
        return ResponseEntity.ok().build();
    }


}
