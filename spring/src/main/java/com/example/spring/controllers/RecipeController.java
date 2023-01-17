package com.example.spring.controllers;

import DTO.*;
import com.example.spring.models.Category;
import com.example.spring.models.Difficulty;
import com.example.spring.models.ImageFile;
import com.example.spring.models.Recipe;
import com.example.spring.services.CategoryService;
import com.example.spring.services.DifficultyService;
import com.example.spring.services.ImageFileService;
import com.example.spring.services.RecipeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private DifficultyService difficultyService;
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private ImageFileService imageFileService;

    private final ModelMapper modelMapper = new ModelMapper();
    @PostMapping("/create")
    public ResponseEntity<Object> createRecipe (@Valid @RequestBody Recipe recipe, BindingResult result){
        if(result.hasErrors()){
            var List = result.getFieldErrors().stream().
                    map(f->new CustomFieldError(f.getField(), f.getDefaultMessage())).
                    collect(Collectors.toList());
            FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
            fieldErrorResponse.setFieldErrors(List);

            return new ResponseEntity(fieldErrorResponse, HttpStatus.NOT_ACCEPTABLE);
        }

        recipeService.createRecipe(recipe);

        return new ResponseEntity(new EmptyJSON("ok"),  HttpStatus.OK);


    }
    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

    @GetMapping("/difficulty")
    public List<Difficulty> getDifficultyLevels(){
        return  difficultyService.getDifficultyLevels();
    }

    @PostMapping(value = "/uploadFile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadFile(@RequestParam MultipartFile file) throws IOException {
        ImageFile img = new ImageFile(file.getOriginalFilename(),file.getBytes());
        var id = imageFileService.createFileReturnId(new ImageFile(null,file.getOriginalFilename(),file.getBytes()));
        IdClass idClass = new IdClass(id);
        return new ResponseEntity(idClass,  HttpStatus.OK);

    }
    @GetMapping("/getFile/{id}" )
    public  ImageFile getImage(@PathVariable long id){
        return imageFileService.getImageById(id);
    }
    @PutMapping(value="/updateFile/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE )
    public  ResponseEntity updateImage(@PathVariable long id,@RequestParam MultipartFile file) throws IOException {
        imageFileService.updateImage(new ImageFile(id,file.getOriginalFilename(),file.getBytes()));
        return new ResponseEntity(new EmptyJSON("ok"),  HttpStatus.OK);
    }
}
