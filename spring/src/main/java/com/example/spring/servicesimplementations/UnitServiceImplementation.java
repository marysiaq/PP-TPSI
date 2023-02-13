package com.example.spring.servicesimplementations;

import com.example.spring.models.Category;
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

    @Override
    public Integer createCategoryReturnId(Unit unit) {
        return unitRepository.save(unit).getId();
    }

    @Override
    public void deleteCategoryById(Integer id) {

    }

    @Override
    public void saveCategory(Unit unit) {
        unitRepository.save(unit);
    }
}
