package com.example.spring.servicesimplementations;

import com.example.spring.models.Difficulty;
import com.example.spring.repositories.DifficultyRepository;
import com.example.spring.services.DifficultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DifficultyServiceImplementation  implements DifficultyService {
    @Autowired
    private DifficultyRepository difficultyRepository;
    @Override
    public List<Difficulty> getDifficultyLevels() {
        return difficultyRepository.findAll();
    }
}
