package com.example.spring.RESTcontrollers;

import DTO.EmptyJSON;
import DTO.IdClass;
import DTO.CustomFieldError;
import DTO.FieldErrorResponse;
import com.example.spring.models.Ingredient;
import com.example.spring.models.Unit;
import com.example.spring.services.IngredientService;
import com.example.spring.services.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;
@CrossOrigin(origins = "*", maxAge = 3600)
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
    public ResponseEntity<Object> updateIngredient(@Valid @RequestBody Ingredient ingredient , BindingResult result) {
        if(result.hasErrors()){
            var List = result.getFieldErrors().stream().
                    map(f->new CustomFieldError(f.getField(), f.getDefaultMessage())).
                    collect(Collectors.toList());
            FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
            fieldErrorResponse.setFieldErrors(List);

            return new ResponseEntity(fieldErrorResponse,HttpStatus.NOT_ACCEPTABLE);
        }
        ingredientService.saveIngredient(ingredient);


        return new ResponseEntity(new EmptyJSON("ok"),  HttpStatus.OK);

    }

    @PostMapping("/create")
    public ResponseEntity<Object> createIngredientReturnId (@Valid @RequestBody Ingredient ingredient, BindingResult result){
        if(result.hasErrors()){
            var List = result.getFieldErrors().stream().
                    map(f->new CustomFieldError(f.getField(), f.getDefaultMessage())).
                            collect(Collectors.toList());
            FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
            fieldErrorResponse.setFieldErrors(List);

            return new ResponseEntity(fieldErrorResponse,HttpStatus.NOT_ACCEPTABLE);
        }


        var id = ingredientService.createIngredientReturnId(ingredient);
        IdClass idClass = new IdClass(id);
        return new ResponseEntity(idClass,  HttpStatus.OK);

    }
}
