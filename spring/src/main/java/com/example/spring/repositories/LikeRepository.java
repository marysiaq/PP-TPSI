package com.example.spring.repositories;

import com.example.spring.models.Like;
import com.example.spring.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.HashMap;
import java.util.List;

public interface LikeRepository extends JpaRepository<Like,Long> {
    List<Like> findAllByRecipe (Recipe recipe);
//select recipes.id , COUNT(likes.id) from recipes,likes where recipes.id = likes.recipe_id group by recipes.id order by (COUNT(likes.id)) desc;
    @Query(value = "select recipes.id from recipes,likes where recipes.id = likes.recipe_id group by recipes.id order by (COUNT(likes.id)) desc", nativeQuery = true)
    List<Long> findRecipesIds();

    Long countByRecipeId(Long recipeId);

    //@Query(value = "select Like.recipe.id, count(Like.id) from ")
   // List<Long> findRecipesIds();


}
