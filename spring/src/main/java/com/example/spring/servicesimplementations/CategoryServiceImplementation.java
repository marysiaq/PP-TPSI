package com.example.spring.servicesimplementations;

import com.example.spring.models.Category;
import com.example.spring.models.Ingredient;
import com.example.spring.models.Recipe;
import com.example.spring.repositories.CategoryRepository;
import com.example.spring.repositories.RecipeReposiory;
import com.example.spring.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImplementation implements CategoryService {
    @Autowired
    RecipeReposiory recipeReposiory;
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Integer createCategoryReturnId(Category category) {
        return categoryRepository.save(category).getId();
    }

    @Override
    public void deleteCategoryById(Integer id) {
        ArrayList<Category> a = new ArrayList<>();
        a.add(categoryRepository.findById(id).get());
        var recipes =  recipeReposiory.findByCategoriesIn(a);
        for (Recipe r:recipes) {
            var categories = r.getCategories().stream().filter(e -> e.getId()!= id).collect(Collectors.toSet());
            r.setCategories(categories);
            recipeReposiory.save(r);
        }

        categoryRepository.deleteById(id);
    }
    public void saveCategory(Category category) {
        categoryRepository.save(category);
    }
}
