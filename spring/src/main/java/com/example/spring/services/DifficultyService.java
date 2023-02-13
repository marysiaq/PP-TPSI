package com.example.spring.services;

import com.example.spring.models.Difficulty;
import com.example.spring.repositories.DifficultyRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface DifficultyService {
    public abstract List<Difficulty> getDifficultyLevels();

}
