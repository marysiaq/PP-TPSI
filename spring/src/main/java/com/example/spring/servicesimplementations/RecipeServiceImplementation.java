package com.example.spring.servicesimplementations;

import com.example.spring.models.Recipe;
import com.example.spring.repositories.RecipeReposiory;
import com.example.spring.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeServiceImplementation implements RecipeService {
    @Autowired
    private RecipeReposiory recipeReposiory;
    @Override
    public void createRecipe(Recipe recipe) {
        recipeReposiory.save(recipe);
    }

    @Override
    public Recipe getRecipeById(Long id) {
        return recipeReposiory.findById(id).orElseThrow();
    }
}
