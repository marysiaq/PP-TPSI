package com.example.spring.services;

import com.example.spring.models.Category;
import com.example.spring.models.Unit;

import java.util.List;

public interface UnitService {
    public abstract List<Unit> getUnits();
    public abstract Integer createCategoryReturnId(Unit unit);
    public abstract void deleteCategoryById(Integer id);
    public void saveCategory(Unit unit);
}

