package com.example.spring.repositories;

import com.example.spring.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository  extends JpaRepository<Category,Integer> {
}
