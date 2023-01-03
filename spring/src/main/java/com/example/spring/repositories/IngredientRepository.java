package com.example.spring.repositories;

import com.example.spring.models.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository  extends JpaRepository<Ingredient,Long> {
}
