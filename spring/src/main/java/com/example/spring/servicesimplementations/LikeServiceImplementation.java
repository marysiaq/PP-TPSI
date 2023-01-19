package com.example.spring.servicesimplementations;

import DTO.RecipeLikes;
import com.example.spring.exceptions.RecipeNotFoundException;
import com.example.spring.models.Like;
import com.example.spring.models.Recipe;
import com.example.spring.repositories.LikeRepository;
import com.example.spring.repositories.RecipeReposiory;
import com.example.spring.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikeServiceImplementation implements LikeService {
    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private RecipeReposiory recipeReposiory;
    @Override
    public void addLike(Long recipeId) {
        Recipe recipe = new Recipe();
        recipe.setId(recipeId);
        likeRepository.save(new Like(recipe));

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
}
