package com.example.spring.repositories;

import com.example.spring.models.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DifficultyRepository extends JpaRepository<Difficulty,Integer> {
}
