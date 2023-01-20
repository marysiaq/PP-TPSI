package com.example.spring.servicesimplementations;

import com.example.spring.exceptions.RecipeNotFoundException;
import com.example.spring.models.Difficulty;
import com.example.spring.models.Like;
import com.example.spring.models.Recipe;
import com.example.spring.repositories.CategoryRepository;
import com.example.spring.repositories.LikeRepository;
import com.example.spring.repositories.RecipeReposiory;
import com.example.spring.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RecipeServiceImplementation implements RecipeService {
    @Autowired
    private RecipeReposiory recipeReposiory;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private LikeRepository likeRepository;
    @Override
    public void createRecipe(Recipe recipe) {
        recipeReposiory.save(recipe);
    }

    @Override
    public Recipe getRecipeById(Long id) throws RecipeNotFoundException {
        return recipeReposiory.findById(id).orElseThrow(()->new RecipeNotFoundException());
    }
    @Override
    public List<Recipe> getRecipes() {

        return recipeReposiory.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @Override
    public void updateRecipe(Recipe recipe) throws RecipeNotFoundException {
        recipeReposiory.save(recipe);
    }

    @Override
    public void deleteRecipeById(Long id) throws RecipeNotFoundException {
        List<Like> list = likeRepository.findAllByRecipe(recipeReposiory.findById(id).orElseThrow(()->new RecipeNotFoundException())) ;
       if(list!=null){
           likeRepository.deleteAll(list);
       }
        recipeReposiory.deleteById(id);
    }

    @Override
    @Transactional
    public List<Recipe> getRecipesCategoriesFilter(List<Integer> list) {
        return recipeReposiory.findByCategoriesIn(categoryRepository.getCategoriesByIdIn(list));
    }

    @Override
    @Transactional
    public List<Recipe> getRecipesPhraseFilter(String phrase) {
        return recipeReposiory.findByNameContainingIgnoreCase(phrase);
    }

    @Override
    @Transactional
    public List<Recipe> getRecipesPreparationTimeFilter(Integer min, Integer max) {
        return recipeReposiory.findByPreparationTimeBetween(min,max);
    }

    @Override
    @Transactional
    public List<Recipe> getRecipesDifficultyFilter(Integer id) {
        return recipeReposiory.findByDifficultyId(id);
    }
}
