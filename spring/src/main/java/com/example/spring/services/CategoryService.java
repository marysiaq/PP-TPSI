package com.example.spring.services;

import com.example.spring.models.Category;

import java.util.List;

public interface CategoryService {
    public abstract List<Category> getCategories();
    public abstract Integer createCategoryReturnId(Category category);
    public abstract void deleteCategoryById(Integer id);
    public void saveCategory(Category category);
}
