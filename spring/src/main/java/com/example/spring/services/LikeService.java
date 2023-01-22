package com.example.spring.services;

import DTO.RecipeLikes;
import com.example.spring.exceptions.RecipeNotFoundException;
import com.example.spring.models.Recipe;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeService {
    public abstract void  addLike(Long recipeId, Long user_id) throws RecipeNotFoundException;
    public abstract boolean findLike(Long recipeId, Long user_id);
    public abstract List<RecipeLikes> getRanking();
    public abstract Long getRecipeLikes(Long recipe_id);

    public abstract void unlikeRecipe(Long recipeId, Long user_id);
    public abstract List<Recipe> getLikedRecipes(Long user_id);




}
