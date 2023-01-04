package com.example.spring.services;

import com.example.spring.models.Category;

import java.util.List;

public interface CategoryService {
    public abstract List<Category> getCategories();
}
