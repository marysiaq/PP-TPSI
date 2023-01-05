package com.example.spring.controllers;

import com.example.spring.models.Category;
import com.example.spring.models.Recipe;
import com.example.spring.repositories.RecipeReposiory;
import com.example.spring.services.CategoryService;
import com.example.spring.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private RecipeService recipeService;
    @PostMapping("/add")
    public void addRecipe (@RequestBody Recipe recipe){
        recipeService.createRecipe(recipe);
    }
    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }


}
