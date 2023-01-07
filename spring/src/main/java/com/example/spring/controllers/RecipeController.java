package com.example.spring.controllers;

import DTO.RecipeDTO;
import com.example.spring.models.Category;
import com.example.spring.models.Difficulty;
import com.example.spring.models.Recipe;
import com.example.spring.repositories.RecipeReposiory;
import com.example.spring.services.CategoryService;
import com.example.spring.services.DifficultyService;
import com.example.spring.services.RecipeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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
    public void createRecipe (@Valid @RequestBody Recipe recipe, BindingResult result){

        recipeService.createRecipe(recipe);

    }
    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

    @GetMapping("/difficulty")
    public List<Difficulty> getDifficultyLevels(){
        return  difficultyService.getDifficultyLevels();
    }


}
