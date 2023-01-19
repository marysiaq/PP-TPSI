package com.example.spring.servicesimplementations;

import DTO.RecipeDTO;
import com.example.spring.models.Ingredient;
import com.example.spring.repositories.IngredientRepository;
import com.example.spring.repositories.RecipeReposiory;
import com.example.spring.services.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service("ingredientService")
public class IngredientServiceImplementation implements IngredientService {
    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private RecipeReposiory recipeReposiory;

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
        List<Ingredient> list = new ArrayList<>();
        list.add(ingredientRepository.findById(id).orElseThrow());
        var recipe = recipeReposiory.findByIngredientsIn(list);
        if(recipe!=null){
           var ing= recipe.getIngredients().stream().filter(e -> e.getId()!= id).collect(Collectors.toList());
           recipe.setIngredients(ing);
           recipeReposiory.save(recipe);
        }
        ingredientRepository.deleteById(id);
    }
    @Override
    public List<Ingredient> getIngredients(List<Long> id) {
        return ingredientRepository.findByIdIn(id);
    }
}
