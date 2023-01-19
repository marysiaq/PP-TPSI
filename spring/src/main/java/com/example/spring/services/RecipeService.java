package com.example.spring.services;

import com.example.spring.exceptions.RecipeNotFoundException;
import com.example.spring.models.Recipe;

import java.util.List;

public interface RecipeService {
    public abstract void createRecipe(Recipe recipe);
    public abstract Recipe getRecipeById(Long id) throws RecipeNotFoundException;
    public abstract List<Recipe> getRecipes();
    public abstract void updateRecipe(Recipe recipe) throws RecipeNotFoundException;
    public abstract void deleteRecipeById(Long id) throws RecipeNotFoundException;


}
