package com.example.spring.servicesimplementations;

import com.example.spring.models.Ingredient;
import com.example.spring.repositories.IngredientRepository;
import com.example.spring.services.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("ingredientService")
public class IngredientServiceImplementation implements IngredientService {
    @Autowired
    private IngredientRepository ingredientRepository;

    @Override
    public void saveIngredient(Ingredient ingredient) {
        ingredientRepository.save(ingredient);
    }

    @Override
    public Long createIngredientReturnId(Ingredient ingredient) {
        return ingredientRepository.save(ingredient).getId();
    }

    @Override
    public Ingredient getIngredientById(Long id) {
        return ingredientRepository.findById(id).orElseThrow();
    }

    @Override
    public void deleteIngredientById(Long id) {
       ingredientRepository.deleteById(id);
    }
}
