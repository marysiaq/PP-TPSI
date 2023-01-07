package com.example.spring.controllers;

import com.example.spring.models.Ingredient;
import com.example.spring.models.Unit;
import com.example.spring.services.IngredientService;
import com.example.spring.services.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    @GetMapping("/{id}" )
    public Ingredient getIngredient(@PathVariable long id){
        return ingredientService.getIngredientById(id);
    }
    @PostMapping("/list" )
    public List<Ingredient> getIngredients(@RequestBody List<Long> ids){
        return ingredientService.getIngredients(ids);
    }

    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable long id) {
        ingredientService.deleteIngredientById(id);
    }

    @PutMapping("/")
    public void updateIngredient(@Valid @RequestBody Ingredient ingredient , BindingResult result) {
        ingredientService.saveIngredient(ingredient);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createIngredientReturnId (@Valid @RequestBody Ingredient ingredient, BindingResult result){
        
        var id = ingredientService.createIngredientReturnId(ingredient);
        return new ResponseEntity(id,  HttpStatus.OK);

    }
}
