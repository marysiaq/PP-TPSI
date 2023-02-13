package com.example.spring.repositories;

import com.example.spring.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository  extends JpaRepository<Category,Integer> {
    public List<Category> getCategoriesByIdIn(List<Integer> list);
}
