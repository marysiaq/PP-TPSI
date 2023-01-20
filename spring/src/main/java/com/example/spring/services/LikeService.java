package com.example.spring.services;

import DTO.RecipeLikes;
import com.example.spring.models.Recipe;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeService {
    public abstract void  addLike(Long recipeId);
    public abstract List<RecipeLikes> getRanking();
    public abstract Long getRecipeLikes(Long id);




}
