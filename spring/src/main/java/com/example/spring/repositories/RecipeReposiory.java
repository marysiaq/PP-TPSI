package com.example.spring.repositories;

import com.example.spring.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeReposiory extends JpaRepository<Recipe,Long> {
}
