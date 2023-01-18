package com.example.spring.services;

import com.example.spring.models.Recipe;

public interface RecipeService {
    public abstract void createRecipe(Recipe recipe);
    public abstract Recipe getRecipeById(Long id);


}
