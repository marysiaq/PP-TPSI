package com.example.spring.controllers;

import com.example.spring.models.Ingredient;
import com.example.spring.models.Unit;
import com.example.spring.services.IngredientService;
import com.example.spring.services.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingredient")
@SessionAttributes(value = {"units"})
public class IngredientController {
    @Autowired
    private UnitService unitService;
    @Autowired
    private IngredientService ingredientService;

    @GetMapping("/units")
    public List<Unit> getUnits (){
        return unitService.getUnits();}

    @PostMapping("/create")
    public void createIngredient (@RequestBody Ingredient ingredient){
        ingredientService.saveIngredient(ingredient);
    }

}
