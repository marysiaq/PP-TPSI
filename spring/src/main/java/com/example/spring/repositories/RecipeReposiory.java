package com.example.spring.repositories;

import com.example.spring.models.ImageFile;
import com.example.spring.models.Ingredient;
import com.example.spring.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeReposiory extends JpaRepository<Recipe,Long> {
    public Recipe findByPhoto(ImageFile imageFile);
    public Recipe findByIngredientsIn(List<Ingredient> ingredients);
}
