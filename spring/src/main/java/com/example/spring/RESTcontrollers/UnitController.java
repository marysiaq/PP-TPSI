package com.example.spring.RESTcontrollers;

import DTO.CustomFieldError;
import DTO.EmptyJSON;
import DTO.FieldErrorResponse;
import DTO.IdClass;
import com.example.spring.exceptions.RecipeNotFoundException;
import com.example.spring.models.Category;
import com.example.spring.models.Ingredient;
import com.example.spring.models.Recipe;
import com.example.spring.models.Unit;
import com.example.spring.services.CategoryService;
import com.example.spring.services.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/unit")
@RestController
public class UnitController {
    @Autowired
    UnitService unitService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> createUnit (@Valid @RequestBody Unit unit, BindingResult result){
        if(result.hasErrors()){
            var List = result.getFieldErrors().stream().
                    map(f->new CustomFieldError(f.getField(), f.getDefaultMessage())).
                    collect(Collectors.toList());
            FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
            fieldErrorResponse.setFieldErrors(List);

            return new ResponseEntity(fieldErrorResponse, HttpStatus.NOT_ACCEPTABLE);
        }

        var  id = unitService.createCategoryReturnId(unit);
        IdClass idClass = new IdClass(id);
        return new ResponseEntity( idClass,  HttpStatus.OK);
    }


    @PutMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> updateUnit(@Valid @RequestBody Unit unit, BindingResult result) {
        if(result.hasErrors()){
            var List = result.getFieldErrors().stream().
                    map(f->new CustomFieldError(f.getField(), f.getDefaultMessage())).
                    collect(Collectors.toList());
            FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
            fieldErrorResponse.setFieldErrors(List);

            return new ResponseEntity(fieldErrorResponse,HttpStatus.NOT_ACCEPTABLE);
        }
        unitService.saveCategory(unit);


        return new ResponseEntity(new EmptyJSON("ok"),  HttpStatus.OK);

    }


}
