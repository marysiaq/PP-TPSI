package com.example.spring.services;

import com.example.spring.models.Ingredient;

import java.util.List;


public interface IngredientService {
    public abstract void saveIngredient(Ingredient ingredient);
    public abstract Long createIngredientReturnId(Ingredient ingredient);
    public abstract Ingredient getIngredientById(Long id);
    public abstract void deleteIngredientById(Long id);
    public abstract List<Ingredient> getIngredients(List<Long> id);



}
