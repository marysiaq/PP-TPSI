package com.example.spring.repositories;

import com.example.spring.models.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientRepository  extends JpaRepository<Ingredient,Long> {


    List<Ingredient> findByIdIn(List<Long> id);
}
