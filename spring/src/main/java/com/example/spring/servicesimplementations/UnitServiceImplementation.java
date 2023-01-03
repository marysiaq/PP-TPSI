package com.example.spring.servicesimplementations;

import com.example.spring.models.Unit;
import com.example.spring.repositories.UnitRepository;
import com.example.spring.services.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("unitService")
public class UnitServiceImplementation implements UnitService {
    @Autowired
    private UnitRepository unitRepository;
    @Override
    public List<Unit> getUnits() {
        return unitRepository.findAll();
    }
}
