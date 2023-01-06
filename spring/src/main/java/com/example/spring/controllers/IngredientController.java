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
    public void updateIngredient(@RequestBody Ingredient ingredient ) {
        ingredientService.saveIngredient(ingredient);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createIngredientReturnId (@RequestBody Ingredient ingredient){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Last-Modified", "Mon, 18 Jul 2016 02:36:04 GMT");//standardowy nagłówek
        headers.add("CreateIngredientReturnId", "My custom header value");//własny nagłówek
        var id = ingredientService.createIngredientReturnId(ingredient);
        return new ResponseEntity(id, headers, HttpStatus.OK);

    }
}
