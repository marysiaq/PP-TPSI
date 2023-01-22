package com.example.spring.servicesimplementations;

import DTO.RecipeLikes;
import com.example.spring.exceptions.RecipeNotFoundException;
import com.example.spring.models.Like;
import com.example.spring.models.Recipe;
import com.example.spring.repositories.LikeRepository;
import com.example.spring.repositories.RecipeReposiory;
import com.example.spring.repositories.UserRepository;
import com.example.spring.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikeServiceImplementation implements LikeService {
    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private RecipeReposiory recipeReposiory;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public void addLike(Long recipe_id,Long user_id) throws RecipeNotFoundException {
        likeRepository.save(new Like(recipeReposiory.findById(recipe_id).orElseThrow(()->new RecipeNotFoundException()),userRepository.findById(user_id).orElseThrow()));
    }

    @Override
    public boolean findLike(Long recipeId, Long user_id) {
        return likeRepository.existsByRecipeIdAndUserId(recipeId,user_id);
    }

    @Override
    public List<RecipeLikes> getRanking() {
        List<Long> recipeIds = likeRepository.findRecipesIds();
        var list = recipeIds.stream().map(e-> {
            try {
                return new RecipeLikes(e,recipeReposiory.findById(e).orElseThrow(()->new RecipeNotFoundException()).getName(), likeRepository.countByRecipeId(e));
            } catch (RecipeNotFoundException ex) {
                throw new RuntimeException(ex);
            }
        }).collect(Collectors.toList());
        return list;
    }

    @Override
    public Long getRecipeLikes(Long id) {
        return likeRepository.countByRecipeId(id);
    }
    @Override
    @Transactional
    public void unlikeRecipe(Long recipeId, Long user_id) {
        likeRepository.deleteAll(likeRepository.findLikeByRecipeIdAndUserId(recipeId,user_id));
    }

    @Override
    @Transactional
    public List<Recipe> getLikedRecipes(Long user_id) {
        var likes  = likeRepository.findLikeByUserId(user_id);
        if(likes.size()==0)return new ArrayList<>();
        var recipes  = likes.stream().map(l ->recipeReposiory.findById(l.getRecipe().getId()).get()).collect(Collectors.toList());
        return recipes;
    }
}
